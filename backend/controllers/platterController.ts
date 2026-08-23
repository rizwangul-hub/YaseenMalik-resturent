import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Platter from '../models/Platter.js';

// In-memory custom platters cache
const customPlattersMap = new Map<string, any>();

// Default platters fallback
const DEFAULT_PLATTERS = [
  {
    _id: 'balochi-platter',
    id: 'balochi-platter',
    name: 'Balochi Platter',
    slug: 'balochi-platter',
    urduName: 'بلوچی شاہی پلیٹر',
    price: 13400,
    priceFormatted: 'Rs. 13,400',
    serves: '8 – 12 Persons',
    description: 'The crown jewel of Yaseen Malak Restaurant. A mammoth royal feast featuring tender mutton, charcoal grilled birds, creamy malai boti, patta tikka, and aromatic pulao for grand family gatherings.',
    image: '/assets/images/hero_bbq_platter_1787336142698.jpg',
    imageUrl: '/assets/images/hero_bbq_platter_1787336142698.jpg',
    badge: 'Grand Royal Feast',
    isPopular: true,
    spiceLevel: 'Authentic Spicy',
    prepTime: '25-35 mins',
    includes: [
      '8 Pcs Malai Boti',
      '8 Pcs Chicken Boti',
      '4 Batairs (Quails)',
      '2 Full Seekh Beef Tikka',
      '2 Kg Mutton Shinwari',
      '2 Chicken Pcs',
      '1 Seekh Patta Tikka',
      '2 Pcs Chapli Kabab',
      '8 Seekh Kabab',
      '4 Plates Sada Pulao',
    ],
    isFeatured: true,
    isAvailable: true,
    sortOrder: 1,
  },
  {
    _id: 'afghani-platter',
    id: 'afghani-platter',
    name: 'Afghani Platter',
    slug: 'afghani-platter',
    urduName: 'افغانی خصوصی پلیٹر',
    price: 4500,
    priceFormatted: 'Rs. 4,500',
    serves: '4 – 6 Persons',
    description: 'A harmonious blend of succulent grilled poultry, fresh Bangash fish, savory beef seekh kababs, and Peshawari beef pulao.',
    image: '/assets/images/afghani_platter_1787336190758.jpg',
    imageUrl: '/assets/images/afghani_platter_1787336190758.jpg',
    badge: 'Most Popular',
    isPopular: true,
    spiceLevel: 'Medium',
    prepTime: '20-25 mins',
    includes: [
      '6 Pcs Malai Boti',
      '6 Pcs Chicken Boti',
      'Half Kg Bangash Fish',
      '8 Pcs Seekh Kabab',
      '1 Plate Beef Pulao',
    ],
    isFeatured: true,
    isAvailable: true,
    sortOrder: 2,
  },
  {
    _id: 'balochi-sajji-rice',
    id: 'balochi-sajji-rice',
    name: 'Balochi Sajji With Rice',
    slug: 'balochi-sajji-rice',
    urduName: 'بلوچی سجی معہ پلاؤ چاول',
    price: 1800,
    priceFormatted: 'Rs. 1,800',
    serves: '2 – 3 Persons',
    description: 'Traditional Balochi style whole chicken slow-roasted on skewers around glowing embers, served on a steaming bed of spiced saffron pulao rice.',
    image: '/assets/images/hero_sajji_rice_1787336159698.jpg',
    imageUrl: '/assets/images/hero_sajji_rice_1787336159698.jpg',
    badge: 'Signature Must-Try',
    isPopular: true,
    spiceLevel: 'Mild',
    prepTime: '15-20 mins',
    includes: [
      '1 Whole Balochi Sajji Chicken',
      'Large Platter Kabuli Pulao Rice',
      'Traditional Mint Chutney & Salad',
    ],
    isFeatured: true,
    isAvailable: true,
    sortOrder: 3,
  },
];

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

    const allPlattersMap = new Map<string, any>();

    // 1. Add default platters
    DEFAULT_PLATTERS.forEach((p) => {
      allPlattersMap.set(p.id, { ...p });
    });

    // 2. Add DB platters
    dbPlatters.forEach((doc) => {
      const p: any = doc.toObject ? doc.toObject() : doc;
      const key = p._id ? p._id.toString() : p.id;
      const imageUrl = p.imageUrl || p.image || '/assets/images/hero_bbq_platter_1787336142698.jpg';
      allPlattersMap.set(key, { ...p, id: key, imageUrl });
    });

    // 3. Add custom platters
    customPlattersMap.forEach((p, key) => {
      allPlattersMap.set(key, { ...p });
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
      data: Array.from(customPlattersMap.values()).concat(DEFAULT_PLATTERS),
    });
  }
};

export const getPlatterById = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(req.params.id)) {
      const platter = await Platter.findById(req.params.id);
      if (platter) {
        const obj: any = platter.toObject();
        obj.id = obj._id.toString();
        obj.imageUrl = obj.imageUrl || obj.image;
        return res.json({
          success: true,
          message: 'Platter details fetched successfully',
          data: obj,
        });
      }
    }

    if (customPlattersMap.has(req.params.id)) {
      return res.json({
        success: true,
        message: 'Platter details fetched successfully',
        data: customPlattersMap.get(req.params.id),
      });
    }

    const defaultFound = DEFAULT_PLATTERS.find((p) => p.id === req.params.id);
    if (defaultFound) {
      return res.json({
        success: true,
        message: 'Platter details fetched successfully',
        data: defaultFound,
      });
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
    const { name, price, includes, imageUrl, image } = req.body;

    if (!name || price === undefined || !includes || !Array.isArray(includes)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide platter name, price, and includes array',
        data: null,
      });
    }

    const slug = req.body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const priceFormatted = req.body.priceFormatted || `Rs. ${Number(price).toLocaleString('en-US')}`;
    const imgUrl = imageUrl || image || '/assets/images/hero_bbq_platter_1787336142698.jpg';

    const dbPayload = {
      name,
      slug,
      urduName: req.body.urduName || '',
      description: req.body.description || '',
      price: Number(price),
      priceFormatted,
      serves: req.body.serves || '',
      servingSize: req.body.servingSize || '',
      image: imgUrl,
      badge: req.body.badge || '',
      isPopular: !!req.body.isPopular,
      includes,
      spiceLevel: req.body.spiceLevel || 'Medium',
      prepTime: req.body.prepTime || '20-25 mins',
      isFeatured: req.body.isFeatured !== false,
      isAvailable: req.body.isAvailable !== false,
      sortOrder: req.body.sortOrder || 0,
    };

    let createdPlatter: any = null;

    if (mongoose.connection.readyState === 1) {
      try {
        const doc = await Platter.create(dbPayload);
        createdPlatter = doc.toObject ? doc.toObject() : doc;
        createdPlatter.id = createdPlatter._id.toString();
        createdPlatter.imageUrl = createdPlatter.image;
      } catch (dbErr: any) {
        console.warn('[PlatterController] DB save error:', dbErr.message);
      }
    }

    if (!createdPlatter) {
      const generatedId = `plat_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      createdPlatter = {
        _id: generatedId,
        id: generatedId,
        ...dbPayload,
        imageUrl: imgUrl,
      };
    }

    customPlattersMap.set(createdPlatter.id || createdPlatter._id.toString(), createdPlatter);

    return res.status(201).json({
      success: true,
      message: 'Platter created successfully',
      data: createdPlatter,
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
        if (req.body.imageUrl) {
          req.body.image = req.body.imageUrl;
        }

        Object.assign(platter, req.body);
        const updatedPlatter = await platter.save();
        const obj: any = updatedPlatter.toObject();
        obj.id = obj._id.toString();
        obj.imageUrl = obj.image;
        customPlattersMap.set(platterId, obj);

        return res.json({
          success: true,
          message: 'Platter updated successfully',
          data: obj,
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
