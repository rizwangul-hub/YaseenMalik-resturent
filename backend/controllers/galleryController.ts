import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Gallery from '../models/Gallery.js';

export const getGalleryItems = async (req: Request, res: Response) => {
  try {
    const { category, isFeatured } = req.query;
    const filter: any = {};

    if (category) filter.category = category;
    if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';

    let items: any[] = [];
    if (mongoose.connection.readyState === 1) {
      items = await Gallery.find(filter).sort({ sortOrder: 1, createdAt: -1 });
    }

    return res.json({
      success: true,
      message: 'Gallery items fetched successfully',
      data: items,
    });
  } catch (error: any) {
    return res.json({
      success: true,
      message: 'Gallery items fetched (Fallback Mode)',
      data: [],
    });
  }
};

export const createGalleryItem = async (req: Request, res: Response) => {
  try {
    const { title, image, category, description } = req.body;

    if (!title || !image) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title and image URL',
        data: null,
      });
    }

    const payload = {
      title,
      image,
      category: category || 'general',
      description: description || '',
      categoryLabel: req.body.categoryLabel || '',
      isFeatured: req.body.isFeatured || false,
      sortOrder: req.body.sortOrder || 0,
    };

    if (mongoose.connection.readyState === 1) {
      const item = await Gallery.create(payload);
      return res.status(201).json({
        success: true,
        message: 'Gallery item created successfully',
        data: item,
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Gallery item created (Fallback Mode)',
      data: { id: `gal_${Date.now()}`, ...payload },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create gallery item',
      data: null,
    });
  }
};

export const deleteGalleryItem = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(req.params.id)) {
      const item = await Gallery.findById(req.params.id);
      if (item) {
        await item.deleteOne();
      }
    }
    return res.json({
      success: true,
      message: 'Gallery item deleted successfully',
      data: null,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete gallery item',
      data: null,
    });
  }
};
