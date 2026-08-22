import { Request, Response } from 'express';
import Category from '../models/Category';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({}).sort({ sortOrder: 1, createdAt: -1 });
    return res.json({
      success: true,
      message: 'Categories fetched successfully',
      data: categories,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch categories',
      data: null,
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
    const existing = await Category.findOne({ slug: generatedSlug });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Category slug already exists',
        data: null,
      });
    }

    const category = await Category.create({
      name,
      slug: generatedSlug,
      description: description || '',
      image: image || '',
      isActive: typeof isActive === 'boolean' ? isActive : true,
      sortOrder: sortOrder || 0,
    });

    return res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category,
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
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
        data: null,
      });
    }

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
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
        data: null,
      });
    }

    await category.deleteOne();
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
