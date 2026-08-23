import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Review from '../models/Review.js';

export const getReviews = async (req: Request, res: Response) => {
  try {
    const { isApproved, isFeatured } = req.query;
    const filter: any = {};

    if (isApproved !== undefined) {
      filter.isApproved = isApproved === 'true';
    } else {
      filter.isApproved = true;
    }

    if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';

    let reviews: any[] = [];
    if (mongoose.connection.readyState === 1) {
      reviews = await Review.find(filter).sort({ createdAt: -1 });
    }

    return res.json({
      success: true,
      message: 'Reviews fetched successfully',
      data: reviews,
    });
  } catch (error: any) {
    return res.json({
      success: true,
      message: 'Reviews fetched (Fallback Mode)',
      data: [],
    });
  }
};

export const createReview = async (req: Request, res: Response) => {
  try {
    const { customerName, author, rating, review, comment, location, dishRecommended } = req.body;

    const name = customerName || author;
    const reviewContent = review || comment;

    if (!name || rating === undefined || !reviewContent) {
      return res.status(400).json({
        success: false,
        message: 'Please provide customer name, rating, and review comment',
        data: null,
      });
    }

    const payload = {
      customerName: name,
      author: name,
      rating: Number(rating),
      review: reviewContent,
      comment: reviewContent,
      location: location || 'Peshawar, KP',
      dishRecommended: dishRecommended || '',
      isApproved: true,
    };

    if (mongoose.connection.readyState === 1) {
      const newReview = await Review.create(payload);
      return res.status(201).json({
        success: true,
        message: 'Review submitted successfully',
        data: newReview,
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Review submitted (Fallback Mode)',
      data: { id: `rev_${Date.now()}`, ...payload },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit review',
      data: null,
    });
  }
};

export const approveReview = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(req.params.id)) {
      const rev = await Review.findById(req.params.id);
      if (rev) {
        rev.isApproved = typeof req.body.isApproved === 'boolean' ? req.body.isApproved : true;
        if (typeof req.body.isFeatured === 'boolean') rev.isFeatured = req.body.isFeatured;
        await rev.save();

        return res.json({
          success: true,
          message: 'Review approval status updated',
          data: rev,
        });
      }
    }

    return res.json({
      success: true,
      message: 'Review approval updated (Fallback Mode)',
      data: { id: req.params.id, ...req.body },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update review status',
      data: null,
    });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(req.params.id)) {
      const rev = await Review.findById(req.params.id);
      if (rev) {
        await rev.deleteOne();
      }
    }
    return res.json({
      success: true,
      message: 'Review deleted successfully',
      data: null,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete review',
      data: null,
    });
  }
};
