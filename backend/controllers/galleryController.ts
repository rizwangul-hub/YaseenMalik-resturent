import { Request, Response } from 'express';
import Gallery from '../models/Gallery';

export const getGalleryItems = async (req: Request, res: Response) => {
  try {
    const { category, isFeatured } = req.query;
    const filter: any = {};

    if (category) filter.category = category;
    if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';

    const items = await Gallery.find(filter).sort({ sortOrder: 1, createdAt: -1 });

    return res.json({
      success: true,
      message: 'Gallery items fetched successfully',
      data: items,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch gallery items',
      data: null,
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

    const item = await Gallery.create({
      title,
      image,
      category: category || 'general',
      description: description || '',
      categoryLabel: req.body.categoryLabel || '',
      isFeatured: req.body.isFeatured || false,
      sortOrder: req.body.sortOrder || 0,
    });

    return res.status(201).json({
      success: true,
      message: 'Gallery item created successfully',
      data: item,
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
    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found',
        data: null,
      });
    }

    await item.deleteOne();
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
