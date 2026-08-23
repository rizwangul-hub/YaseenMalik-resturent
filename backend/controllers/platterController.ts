import { Request, Response } from 'express';
import Platter from '../models/Platter.js';

export const getPlatters = async (req: Request, res: Response) => {
  try {
    const { isAvailable, isFeatured } = req.query;
    const filter: any = {};

    if (isAvailable !== undefined) filter.isAvailable = isAvailable === 'true';
    if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';

    const platters = await Platter.find(filter).sort({ sortOrder: 1, createdAt: -1 });

    return res.json({
      success: true,
      message: 'Signature platters fetched successfully',
      data: platters,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch platters',
      data: null,
    });
  }
};

export const getPlatterById = async (req: Request, res: Response) => {
  try {
    const platter = await Platter.findById(req.params.id);
    if (!platter) {
      return res.status(404).json({
        success: false,
        message: 'Platter not found',
        data: null,
      });
    }

    return res.json({
      success: true,
      message: 'Platter details fetched successfully',
      data: platter,
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

    const platter = await Platter.create({
      ...req.body,
      slug,
      priceFormatted,
    });

    return res.status(201).json({
      success: true,
      message: 'Platter created successfully',
      data: platter,
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
    const platter = await Platter.findById(req.params.id);
    if (!platter) {
      return res.status(404).json({
        success: false,
        message: 'Platter not found',
        data: null,
      });
    }

    if (req.body.price !== undefined && !req.body.priceFormatted) {
      req.body.priceFormatted = `Rs. ${Number(req.body.price).toLocaleString('en-US')}`;
    }

    Object.assign(platter, req.body);
    const updatedPlatter = await platter.save();

    return res.json({
      success: true,
      message: 'Platter updated successfully',
      data: updatedPlatter,
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
    const platter = await Platter.findById(req.params.id);
    if (!platter) {
      return res.status(404).json({
        success: false,
        message: 'Platter not found',
        data: null,
      });
    }

    await platter.deleteOne();
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
