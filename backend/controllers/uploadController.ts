import { Request, Response } from 'express';
import cloudinary from '../config/cloudinary.js';

// @desc    Upload image to Cloudinary
// @route   POST /api/upload
// @access  Private / Admin
export const uploadImage = async (req: Request, res: Response) => {
  try {
    const { image, folder } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an image (base64 string or image URL) to upload',
        data: null,
      });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;

    // 1. If Cloudinary credentials configured in .env, upload to Cloudinary
    if (cloudName && apiKey && cloudName !== 'demo') {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: folder || 'yaseen_malak_restaurant',
        resource_type: 'auto',
      });

      return res.json({
        success: true,
        message: 'Image uploaded successfully to Cloudinary',
        data: {
          url: uploadResponse.secure_url,
          public_id: uploadResponse.public_id,
        },
      });
    }

    // 2. Fallback mode if Cloudinary keys not set in .env yet
    console.log('[Cloudinary Notice]: CLOUDINARY_CLOUD_NAME not set in .env yet. Returning input image URL.');
    return res.json({
      success: true,
      message: 'Image processed (Set CLOUDINARY_CLOUD_NAME in .env for Cloudinary storage)',
      data: {
        url: image,
        public_id: `local_${Date.now()}`,
      },
    });
  } catch (error: any) {
    console.error('[Cloudinary Upload Error]:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload image to Cloudinary',
      data: null,
    });
  }
};
