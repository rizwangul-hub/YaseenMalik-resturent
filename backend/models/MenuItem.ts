import mongoose, { Document, Schema } from 'mongoose';

export interface IMenuItem extends Document {
  name: string;
  slug: string;
  urduName?: string;
  description: string;
  category: string;
  categoryLabel?: string;
  price: number;
  priceFormatted?: string;
  image: string;
  isAvailable: boolean;
  isFeatured: boolean;
  isSpecialty?: boolean;
  isBestSeller?: boolean;
  tags?: string[];
  servingSize?: string;
  ingredients?: string[];
  sortOrder: number;
}

const menuItemSchema = new Schema<IMenuItem>(
  {
    name: {
      type: String,
      required: [true, 'Please add a menu item name'],
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
    category: {
      type: String,
      required: [true, 'Please specify a category'],
    },
    categoryLabel: {
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
    image: {
      type: String,
      default: '',
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isSpecialty: {
      type: Boolean,
      default: false,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: String,
      },
    ],
    servingSize: {
      type: String,
      default: '',
    },
    ingredients: [
      {
        type: String,
      },
    ],
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IMenuItem>('MenuItem', menuItemSchema);
