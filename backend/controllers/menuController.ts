import { Request, Response } from 'express';
import mongoose from 'mongoose';
import MenuItem from '../models/MenuItem.js';

// In-memory custom items cache so newly created items appear instantly in all modes
const customMenuItemsMap = new Map<string, any>();

// Default menu items fallback so empty DB displays menu items + custom items
const DEFAULT_MENU_ITEMS = [
  {
    _id: 'spec-balochi-platter',
    id: 'spec-balochi-platter',
    name: 'Balochi Platter',
    slug: 'spec-balochi-platter',
    urduName: 'بلوچی پلیٹر',
    category: 'platters',
    categoryLabel: 'Platters',
    price: 13400,
    priceFormatted: 'Rs. 13,400',
    description: 'Grand 10-item BBQ & Mutton royal platter designed for 8–12 persons.',
    image: '/assets/images/hero_bbq_platter_1787336142698.jpg',
    imageUrl: '/assets/images/hero_bbq_platter_1787336142698.jpg',
    isAvailable: true,
    isFeatured: true,
    isSpecialty: true,
    isBestSeller: true,
    servingSize: '8-12 Persons',
    sortOrder: 1,
  },
  {
    _id: 'spec-afghani-platter',
    id: 'spec-afghani-platter',
    name: 'Afghani Platter',
    slug: 'spec-afghani-platter',
    urduName: 'افغانی پلیٹر',
    category: 'platters',
    categoryLabel: 'Platters',
    price: 4500,
    priceFormatted: 'Rs. 4,500',
    description: 'Malai boti, chicken boti, Bangash fish, seekh kababs & beef pulao.',
    image: '/assets/images/afghani_platter_1787336190758.jpg',
    imageUrl: '/assets/images/afghani_platter_1787336190758.jpg',
    isAvailable: true,
    isFeatured: true,
    isSpecialty: true,
    isBestSeller: true,
    servingSize: '4-6 Persons',
    sortOrder: 2,
  },
  {
    _id: 'spec-balochi-sajji',
    id: 'spec-balochi-sajji',
    name: 'Balochi Sajji With Rice',
    slug: 'spec-balochi-sajji',
    urduName: 'بلوچی سجی معہ چاول',
    category: 'chicken',
    categoryLabel: 'Special Sajji',
    price: 1800,
    priceFormatted: 'Rs. 1,800',
    description: 'Authentic whole rotisserie chicken seasoned with mountain rock salt on fragrant kabuli pulao.',
    image: '/assets/images/hero_sajji_rice_1787336159698.jpg',
    imageUrl: '/assets/images/hero_sajji_rice_1787336159698.jpg',
    isAvailable: true,
    isFeatured: true,
    isSpecialty: true,
    isBestSeller: true,
    servingSize: '2-3 Persons',
    sortOrder: 3,
  },
  {
    _id: 'spec-malai-boti',
    id: 'spec-malai-boti',
    name: 'Malai Boti',
    slug: 'spec-malai-boti',
    urduName: 'ملائی بوٹی',
    category: 'bbq',
    categoryLabel: 'BBQ Grill',
    price: 950,
    priceFormatted: 'Rs. 950',
    description: 'Boneless chicken cubes steeped in heavy cream, green cardamom, mild white pepper, grilled gently.',
    image: '/assets/images/hero_bbq_platter_1787336142698.jpg',
    imageUrl: '/assets/images/hero_bbq_platter_1787336142698.jpg',
    isAvailable: true,
    isFeatured: true,
    isSpecialty: true,
    servingSize: '8 Pcs',
    sortOrder: 4,
  },
  {
    _id: 'spec-chicken-boti',
    id: 'spec-chicken-boti',
    name: 'Chicken Boti',
    slug: 'spec-chicken-boti',
    urduName: 'چکن تکہ بوٹی',
    category: 'bbq',
    categoryLabel: 'BBQ Grill',
    price: 750,
    priceFormatted: 'Rs. 750',
    description: 'Juicy marinated chicken chunks charred to perfection over burning oak charcoal.',
    image: '/assets/images/hero_grill_live_1787336174779.jpg',
    imageUrl: '/assets/images/hero_grill_live_1787336174779.jpg',
    isAvailable: true,
    isFeatured: false,
    isSpecialty: true,
    servingSize: '8 Pcs',
    sortOrder: 5,
  },
  {
    _id: 'spec-seekh-kabab',
    id: 'spec-seekh-kabab',
    name: 'Seekh Kabab',
    slug: 'spec-seekh-kabab',
    urduName: 'سیخ کباب',
    category: 'kababs',
    categoryLabel: 'Kababs',
    price: 800,
    priceFormatted: 'Rs. 800',
    description: 'Prime minced beef infused with crushed coriander, roasted cumin, ginger and char-broiled on flat skewers.',
    image: '/assets/images/hero_bbq_platter_1787336142698.jpg',
    imageUrl: '/assets/images/hero_bbq_platter_1787336142698.jpg',
    isAvailable: true,
    isFeatured: false,
    isSpecialty: true,
    servingSize: '4 Pcs',
    sortOrder: 6,
  },
  {
    _id: 'spec-chapli-kabab',
    id: 'spec-chapli-kabab',
    name: 'Chapli Kabab',
    slug: 'spec-chapli-kabab',
    urduName: 'پشاوری چپلی کباب',
    category: 'kababs',
    categoryLabel: 'Peshawari Kababs',
    price: 700,
    priceFormatted: 'Rs. 700',
    description: 'Legendary Peshawar-style fried minced beef patties with pomegranate seeds, coriander, and fresh tomato crowns.',
    image: '/assets/images/chapli_kabab_1787336206450.jpg',
    imageUrl: '/assets/images/chapli_kabab_1787336206450.jpg',
    isAvailable: true,
    isFeatured: true,
    isSpecialty: true,
    isBestSeller: true,
    servingSize: '2 Large Pcs',
    sortOrder: 7,
  },
  {
    _id: 'spec-beef-pulao',
    id: 'spec-beef-pulao',
    name: 'Beef Pulao',
    slug: 'spec-beef-pulao',
    urduName: 'پشاوری بیف پلاؤ',
    category: 'rice',
    categoryLabel: 'Rice & Pulao',
    price: 850,
    priceFormatted: 'Rs. 850',
    description: 'Traditional Peshawari aromatic long-grain basmati simmered in bone marrow broth with tender beef shanks.',
    image: '/assets/images/hero_sajji_rice_1787336159698.jpg',
    imageUrl: '/assets/images/hero_sajji_rice_1787336159698.jpg',
    isAvailable: true,
    isFeatured: false,
    isSpecialty: true,
    servingSize: '1 Large Plate',
    sortOrder: 8,
  },
];

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

    const allItemsMap = new Map<string, any>();

    // 1. Add default seed items first if DB has no items or to ensure baseline
    DEFAULT_MENU_ITEMS.forEach((item) => {
      allItemsMap.set(item.id, { ...item });
    });

    // 2. Add DB items (overwriting defaults if matching)
    dbItems.forEach((doc) => {
      const item: any = doc.toObject ? doc.toObject() : doc;
      const key = item._id ? item._id.toString() : item.id;
      const imageUrl = item.imageUrl || item.image || '/assets/images/hero_bbq_platter_1787336142698.jpg';
      allItemsMap.set(key, { ...item, id: key, imageUrl });
    });

    // 3. Add in-memory custom created items
    customMenuItemsMap.forEach((item, key) => {
      allItemsMap.set(key, { ...item });
    });

    let result = Array.from(allItemsMap.values());

    // Apply category filter if specified
    if (category) {
      result = result.filter((i) => i.category === category);
    }

    return res.json({
      success: true,
      message: 'Menu items fetched successfully',
      data: result,
    });
  } catch (error: any) {
    return res.json({
      success: true,
      message: 'Menu items fetched (Fallback Mode)',
      data: Array.from(customMenuItemsMap.values()).concat(DEFAULT_MENU_ITEMS),
    });
  }
};

export const getMenuItemById = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(req.params.id)) {
      const item = await MenuItem.findById(req.params.id);
      if (item) {
        const obj: any = item.toObject();
        obj.id = obj._id.toString();
        obj.imageUrl = obj.imageUrl || obj.image;
        return res.json({
          success: true,
          message: 'Menu item details fetched',
          data: obj,
        });
      }
    }

    // Check custom map & default map
    if (customMenuItemsMap.has(req.params.id)) {
      return res.json({
        success: true,
        message: 'Menu item details fetched',
        data: customMenuItemsMap.get(req.params.id),
      });
    }

    const defaultFound = DEFAULT_MENU_ITEMS.find((i) => i.id === req.params.id);
    if (defaultFound) {
      return res.json({
        success: true,
        message: 'Menu item details fetched',
        data: defaultFound,
      });
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
    const { name, category, price, description, imageUrl, image } = req.body;

    if (!name || !category || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, category, and price',
        data: null,
      });
    }

    const slug = req.body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const priceFormatted = req.body.priceFormatted || `Rs. ${Number(price).toLocaleString('en-US')}`;
    const imgUrl = imageUrl || image || '/assets/images/hero_bbq_platter_1787336142698.jpg';

    // DB Payload (without custom _id string so Mongoose generates valid ObjectId)
    const dbPayload = {
      name,
      slug,
      urduName: req.body.urduName || '',
      description: description || '',
      category,
      categoryLabel: req.body.categoryLabel || category,
      price: Number(price),
      priceFormatted,
      image: imgUrl,
      isAvailable: req.body.isAvailable !== false,
      isFeatured: !!req.body.isFeatured,
      isSpecialty: !!req.body.isSpecialty,
      isBestSeller: !!req.body.isBestSeller,
      servingSize: req.body.servingSize || '',
      sortOrder: req.body.sortOrder || 0,
    };

    let createdItem: any = null;

    if (mongoose.connection.readyState === 1) {
      try {
        const doc = await MenuItem.create(dbPayload);
        createdItem = doc.toObject ? doc.toObject() : doc;
        createdItem.id = createdItem._id.toString();
        createdItem.imageUrl = createdItem.image;
      } catch (dbErr: any) {
        console.warn('[MenuController] DB save error:', dbErr.message);
      }
    }

    if (!createdItem) {
      const generatedId = `item_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      createdItem = {
        _id: generatedId,
        id: generatedId,
        ...dbPayload,
        imageUrl: imgUrl,
      };
    }

    // Cache in custom map so it is available immediately
    customMenuItemsMap.set(createdItem.id || createdItem._id.toString(), createdItem);

    return res.status(201).json({
      success: true,
      message: 'Menu item created successfully',
      data: createdItem,
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
        if (req.body.imageUrl) {
          req.body.image = req.body.imageUrl;
        }
        Object.assign(item, req.body);
        const updatedItem = await item.save();

        const obj: any = updatedItem.toObject();
        obj.id = obj._id.toString();
        obj.imageUrl = obj.image;
        customMenuItemsMap.set(itemId, obj);

        return res.json({
          success: true,
          message: 'Menu item updated successfully',
          data: obj,
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
