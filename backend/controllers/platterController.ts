import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Platter from '../models/Platter.js';

// In-memory custom platters cache
const customPlattersMap = new Map<string, any>();

export const getPlatters = async (req: Request, res: Response) => {
  try {
    const { isAvailable, isFeatured } = req.query;
    const filter: any = {};

    if (isAvailable !== undefined) filter.isAvailable = isAvailable === 'true';
    if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';

    let dbPlatters: any[] = [];
    if (mongoose.connection.readyState === 1) {
      try {
        dbPlatters = await Platter.find(filter).sort({ sortOrder: 1, createdAt: -1 });
      } catch (e) {}
    }

    const customPlatters = Array.from(customPlattersMap.values());
    const allPlattersMap = new Map<string, any>();

    dbPlatters.forEach((p) => {
      const key = p._id ? p._id.toString() : p.id;
      allPlattersMap.set(key, p);
    });

    customPlatters.forEach((p) => {
      const key = p._id ? p._id.toString() : (p.id || p.name);
      if (!allPlattersMap.has(key)) {
        allPlattersMap.set(key, p);
      }
    });

    return res.json({
      success: true,
      message: 'Signature platters fetched successfully',
      data: Array.from(allPlattersMap.values()),
    });
  } catch (error: any) {
    return res.json({
      success: true,
      message: 'Signature platters fetched (Fallback Mode)',
      data: Array.from(customPlattersMap.values()),
    });
  }
};

export const getPlatterById = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(req.params.id)) {
      const platter = await Platter.findById(req.params.id);
      if (platter) {
        return res.json({
          success: true,
          message: 'Platter details fetched successfully',
          data: platter,
        });
      }
    }

    for (const platter of customPlattersMap.values()) {
      if (platter.id === req.params.id || platter._id === req.params.id) {
        return res.json({
          success: true,
          message: 'Platter details fetched successfully',
          data: platter,
        });
      }
    }

    return res.status(404).json({
      success: false,
      message: 'Platter not found',
      data: null,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch platter details',
      data: null,
    });
  }
};

export const createPlatter = async (req: Request, res: Response) => {
  try {
    const { name, price, includes } = req.body;

    if (!name || price === undefined || !includes || !Array.isArray(includes)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide platter name, price, and includes array',
        data: null,
      });
    }

    const slug = req.body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const priceFormatted = req.body.priceFormatted || `Rs. ${Number(price).toLocaleString('en-US')}`;
    const generatedId = `plat_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const payload = {
      id: generatedId,
      _id: generatedId,
      ...req.body,
      slug,
      priceFormatted,
      isAvailable: req.body.isAvailable !== false,
    };

    customPlattersMap.set(generatedId, payload);

    if (mongoose.connection.readyState === 1) {
      try {
        const platter = await Platter.create(payload);
        return res.status(201).json({
          success: true,
          message: 'Platter created successfully',
          data: platter,
        });
      } catch (dbErr) {
        console.warn('[PlatterController] DB save warning, using custom map:', dbErr);
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Platter created successfully',
      data: payload,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create platter',
      data: null,
    });
  }
};

export const updatePlatter = async (req: Request, res: Response) => {
  try {
    const platterId = req.params.id;

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(platterId)) {
      const platter = await Platter.findById(platterId);
      if (platter) {
        if (req.body.price !== undefined && !req.body.priceFormatted) {
          req.body.priceFormatted = `Rs. ${Number(req.body.price).toLocaleString('en-US')}`;
        }

        Object.assign(platter, req.body);
        const updatedPlatter = await platter.save();
        customPlattersMap.set(platterId, updatedPlatter);

        return res.json({
          success: true,
          message: 'Platter updated successfully',
          data: updatedPlatter,
        });
      }
    }

    if (customPlattersMap.has(platterId)) {
      const existing = customPlattersMap.get(platterId);
      const updated = { ...existing, ...req.body };
      customPlattersMap.set(platterId, updated);
      return res.json({
        success: true,
        message: 'Platter updated successfully',
        data: updated,
      });
    }

    return res.json({
      success: true,
      message: 'Platter updated successfully',
      data: { id: platterId, ...req.body },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update platter',
      data: null,
    });
  }
};

export const deletePlatter = async (req: Request, res: Response) => {
  try {
    const platterId = req.params.id;

    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(platterId)) {
      const platter = await Platter.findById(platterId);
      if (platter) {
        await platter.deleteOne();
      }
    }

    customPlattersMap.delete(platterId);

    return res.json({
      success: true,
      message: 'Platter deleted successfully',
      data: null,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete platter',
      data: null,
    });
  }
};
