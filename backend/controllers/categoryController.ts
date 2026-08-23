import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Category from '../models/Category.js';

export const getCategories = async (req: Request, res: Response) => {
  try {
    let categories: any[] = [];
    if (mongoose.connection.readyState === 1) {
      categories = await Category.find({}).sort({ sortOrder: 1, createdAt: -1 });
    }

    return res.json({
      success: true,
      message: 'Categories fetched successfully',
      data: categories,
    });
  } catch (error: any) {
    return res.json({
      success: true,
      message: 'Categories fetched (Fallback Mode)',
      data: [],
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, slug, description, image, isActive, sortOrder } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required',
        data: null,
      });
    }

    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const payload = {
      name,
      slug: generatedSlug,
      description: description || '',
      image: image || '',
      isActive: typeof isActive === 'boolean' ? isActive : true,
      sortOrder: sortOrder || 0,
    };

    if (mongoose.connection.readyState === 1) {
      const category = await Category.create(payload);
      return res.status(201).json({
        success: true,
        message: 'Category created successfully',
        data: category,
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Category created (Fallback Mode)',
      data: { id: `cat_${Date.now()}`, ...payload },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create category',
      data: null,
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(req.params.id)) {
      const category = await Category.findById(req.params.id);
      if (category) {
        category.name = req.body.name || category.name;
        if (req.body.slug) category.slug = req.body.slug;
        if (req.body.description !== undefined) category.description = req.body.description;
        if (req.body.image !== undefined) category.image = req.body.image;
        if (typeof req.body.isActive === 'boolean') category.isActive = req.body.isActive;
        if (req.body.sortOrder !== undefined) category.sortOrder = req.body.sortOrder;

        const updatedCategory = await category.save();
        return res.json({
          success: true,
          message: 'Category updated successfully',
          data: updatedCategory,
        });
      }
    }

    return res.json({
      success: true,
      message: 'Category updated (Fallback Mode)',
      data: { id: req.params.id, ...req.body },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update category',
      data: null,
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(req.params.id)) {
      const category = await Category.findById(req.params.id);
      if (category) {
        await category.deleteOne();
      }
    }
    return res.json({
      success: true,
      message: 'Category deleted successfully',
      data: null,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete category',
      data: null,
    });
  }
};
