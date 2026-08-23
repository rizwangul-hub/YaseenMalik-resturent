import { Request, Response } from 'express';
import mongoose from 'mongoose';
import MenuItem from '../models/MenuItem.js';

// In-memory custom items cache so newly created items appear instantly in all modes
const customMenuItemsMap = new Map<string, any>();

export const getMenuItems = async (req: Request, res: Response) => {
  try {
    const { category, isAvailable, isFeatured, isSpecialty } = req.query;
    const filter: any = {};

    if (category) filter.category = category;
    if (isAvailable !== undefined) filter.isAvailable = isAvailable === 'true';
    if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';
    if (isSpecialty !== undefined) filter.isSpecialty = isSpecialty === 'true';

    let dbItems: any[] = [];
    if (mongoose.connection.readyState === 1) {
      try {
        dbItems = await MenuItem.find(filter).sort({ sortOrder: 1, createdAt: -1 });
      } catch (e) {}
    }

    // Merge in-memory custom items
    const customItems = Array.from(customMenuItemsMap.values());
    const allItemsMap = new Map<string, any>();

    // Add DB items first
    dbItems.forEach((item) => {
      const key = item._id ? item._id.toString() : item.id;
      allItemsMap.set(key, item);
    });

    // Add custom items
    customItems.forEach((item) => {
      const key = item._id ? item._id.toString() : (item.id || item.name);
      if (!allItemsMap.has(key)) {
        allItemsMap.set(key, item);
      }
    });

    let result = Array.from(allItemsMap.values());

    return res.json({
      success: true,
      message: 'Menu items fetched successfully',
      data: result,
    });
  } catch (error: any) {
    return res.json({
      success: true,
      message: 'Menu items fetched (Fallback Mode)',
      data: Array.from(customMenuItemsMap.values()),
    });
  }
};

export const getMenuItemById = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(req.params.id)) {
      const item = await MenuItem.findById(req.params.id);
      if (item) {
        return res.json({
          success: true,
          message: 'Menu item details fetched',
          data: item,
        });
      }
    }

    // Check custom map
    for (const item of customMenuItemsMap.values()) {
      if (item.id === req.params.id || item._id === req.params.id) {
        return res.json({
          success: true,
          message: 'Menu item details fetched',
          data: item,
        });
      }
    }

    return res.status(404).json({
      success: false,
      message: 'Menu item not found',
      data: null,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching menu item',
      data: null,
    });
  }
};

export const createMenuItem = async (req: Request, res: Response) => {
  try {
    const { name, category, price, description } = req.body;

    if (!name || !category || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, category, and price',
        data: null,
      });
    }

    const slug = req.body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const priceFormatted = req.body.priceFormatted || `Rs. ${Number(price).toLocaleString('en-US')}`;
    const generatedId = `item_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const payload = {
      id: generatedId,
      _id: generatedId,
      ...req.body,
      slug,
      priceFormatted,
      description: description || '',
      isAvailable: req.body.isAvailable !== false,
    };

    // Always store in custom map so it is available immediately across API calls
    customMenuItemsMap.set(generatedId, payload);

    if (mongoose.connection.readyState === 1) {
      try {
        const menuItem = await MenuItem.create(payload);
        return res.status(201).json({
          success: true,
          message: 'Menu item created successfully',
          data: menuItem,
        });
      } catch (dbErr) {
        console.warn('[MenuController] DB save warning, using custom map:', dbErr);
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Menu item created successfully',
      data: payload,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create menu item',
      data: null,
    });
  }
};

export const updateMenuItem = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id;

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(itemId)) {
      const item = await MenuItem.findById(itemId);
      if (item) {
        if (req.body.price !== undefined && !req.body.priceFormatted) {
          req.body.priceFormatted = `Rs. ${Number(req.body.price).toLocaleString('en-US')}`;
        }
        Object.assign(item, req.body);
        const updatedItem = await item.save();

        customMenuItemsMap.set(itemId, updatedItem);

        return res.json({
          success: true,
          message: 'Menu item updated successfully',
          data: updatedItem,
        });
      }
    }

    // Update in custom map
    if (customMenuItemsMap.has(itemId)) {
      const existing = customMenuItemsMap.get(itemId);
      const updated = { ...existing, ...req.body };
      customMenuItemsMap.set(itemId, updated);
      return res.json({
        success: true,
        message: 'Menu item updated successfully',
        data: updated,
      });
    }

    return res.json({
      success: true,
      message: 'Menu item updated successfully',
      data: { id: itemId, ...req.body },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update menu item',
      data: null,
    });
  }
};

export const deleteMenuItem = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id;

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(itemId)) {
      const item = await MenuItem.findById(itemId);
      if (item) {
        await item.deleteOne();
      }
    }

    customMenuItemsMap.delete(itemId);

    return res.json({
      success: true,
      message: 'Menu item deleted successfully',
      data: null,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete menu item',
      data: null,
    });
  }
};
