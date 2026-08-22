import mongoose, { Document, Schema } from 'mongoose';

export interface IGallery extends Document {
  title: string;
  image: string;
  category: 'platters' | 'bbq' | 'sajji' | 'ambiance' | 'general';
  categoryLabel?: string;
  description?: string;
  isFeatured: boolean;
  sortOrder: number;
}

const gallerySchema = new Schema<IGallery>(
  {
    title: {
      type: String,
      required: [true, 'Please add a gallery item title'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Please provide an image URL'],
    },
    category: {
      type: String,
      enum: ['platters', 'bbq', 'sajji', 'ambiance', 'general'],
      default: 'general',
    },
    categoryLabel: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IGallery>('Gallery', gallerySchema);
