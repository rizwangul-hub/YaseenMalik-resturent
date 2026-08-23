import { Request, Response } from 'express';
import mongoose from 'mongoose';
import MenuItem from '../models/MenuItem.js';

export const getMenuItems = async (req: Request, res: Response) => {
  try {
    const { category, isAvailable, isFeatured, isSpecialty } = req.query;
    const filter: any = {};

    if (category) filter.category = category;
    if (isAvailable !== undefined) filter.isAvailable = isAvailable === 'true';
    if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';
    if (isSpecialty !== undefined) filter.isSpecialty = isSpecialty === 'true';

    let items: any[] = [];
    if (mongoose.connection.readyState === 1) {
      items = await MenuItem.find(filter).sort({ sortOrder: 1, createdAt: -1 });
    }

    return res.json({
      success: true,
      message: 'Menu items fetched successfully',
      data: items,
    });
  } catch (error: any) {
    return res.json({
      success: true,
      message: 'Menu items fetched (Fallback Mode)',
      data: [],
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

    const payload = {
      ...req.body,
      slug,
      priceFormatted,
      description: description || '',
    };

    if (mongoose.connection.readyState === 1) {
      const menuItem = await MenuItem.create(payload);
      return res.status(201).json({
        success: true,
        message: 'Menu item created successfully',
        data: menuItem,
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Menu item created (Fallback Mode)',
      data: { id: `item_${Date.now()}`, ...payload },
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
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(req.params.id)) {
      const item = await MenuItem.findById(req.params.id);
      if (item) {
        if (req.body.price !== undefined && !req.body.priceFormatted) {
          req.body.priceFormatted = `Rs. ${Number(req.body.price).toLocaleString('en-US')}`;
        }

        Object.assign(item, req.body);
        const updatedItem = await item.save();

        return res.json({
          success: true,
          message: 'Menu item updated successfully',
          data: updatedItem,
        });
      }
    }

    return res.json({
      success: true,
      message: 'Menu item updated (Fallback Mode)',
      data: { id: req.params.id, ...req.body },
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
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(req.params.id)) {
      const item = await MenuItem.findById(req.params.id);
      if (item) {
        await item.deleteOne();
      }
    }
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
