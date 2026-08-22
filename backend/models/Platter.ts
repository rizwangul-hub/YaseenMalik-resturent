import mongoose, { Document, Schema } from 'mongoose';

export interface IPlatter extends Document {
  name: string;
  slug: string;
  urduName?: string;
  description: string;
  price: number;
  priceFormatted?: string;
  serves?: string;
  servingSize?: string;
  image: string;
  badge?: string;
  isPopular?: boolean;
  includes: string[];
  spiceLevel?: 'Mild' | 'Medium' | 'Authentic Spicy';
  prepTime?: string;
  isFeatured: boolean;
  isAvailable: boolean;
  sortOrder: number;
}

const platterSchema = new Schema<IPlatter>(
  {
    name: {
      type: String,
      required: [true, 'Please add a platter name'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    urduName: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    priceFormatted: {
      type: String,
      default: '',
    },
    serves: {
      type: String,
      default: '',
    },
    servingSize: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    badge: {
      type: String,
      default: '',
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    includes: [
      {
        type: String,
        required: true,
      },
    ],
    spiceLevel: {
      type: String,
      enum: ['Mild', 'Medium', 'Authentic Spicy'],
      default: 'Medium',
    },
    prepTime: {
      type: String,
      default: '',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isAvailable: {
      type: Boolean,
      default: true,
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

export default mongoose.model<IPlatter>('Platter', platterSchema);
