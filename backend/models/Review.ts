import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  customerName: string;
  author?: string; // alias for customerName
  rating: number;
  review: string;
  comment?: string; // alias for review
  location?: string;
  dishRecommended?: string;
  image?: string;
  avatarUrl?: string;
  isApproved: boolean;
  isFeatured: boolean;
}

const reviewSchema = new Schema<IReview>(
  {
    customerName: {
      type: String,
      required: [true, 'Please add customer name'],
      trim: true,
    },
    author: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      required: [true, 'Please add a rating between 1 and 5'],
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: [true, 'Please add a review comment'],
    },
    comment: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: 'Peshawar, Pakistan',
    },
    dishRecommended: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IReview>('Review', reviewSchema);
