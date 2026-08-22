import { Request, Response } from 'express';
import Review from '../models/Review';

export const getReviews = async (req: Request, res: Response) => {
  try {
    const { isApproved, isFeatured } = req.query;
    const filter: any = {};

    if (isApproved !== undefined) {
      filter.isApproved = isApproved === 'true';
    } else {
      // By default public callers get approved reviews
      filter.isApproved = true;
    }

    if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';

    const reviews = await Review.find(filter).sort({ createdAt: -1 });

    return res.json({
      success: true,
      message: 'Reviews fetched successfully',
      data: reviews,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch reviews',
      data: null,
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

    const newReview = await Review.create({
      customerName: name,
      author: name,
      rating: Number(rating),
      review: reviewContent,
      comment: reviewContent,
      location: location || 'Peshawar, KP',
      dishRecommended: dishRecommended || '',
      isApproved: true, // auto approve in initial setup
    });

    return res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      data: newReview,
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
    const rev = await Review.findById(req.params.id);
    if (!rev) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
        data: null,
      });
    }

    rev.isApproved = typeof req.body.isApproved === 'boolean' ? req.body.isApproved : true;
    if (typeof req.body.isFeatured === 'boolean') rev.isFeatured = req.body.isFeatured;

    await rev.save();

    return res.json({
      success: true,
      message: 'Review approval status updated',
      data: rev,
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
    const rev = await Review.findById(req.params.id);
    if (!rev) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
        data: null,
      });
    }

    await rev.deleteOne();
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
