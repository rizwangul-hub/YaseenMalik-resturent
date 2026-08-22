import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  type: 'dish' | 'platter';
}

export interface IOrder extends Document {
  orderNumber: string;
  customerName: string;
  phone: string;
  email?: string;
  address?: string;
  orderType: 'DELIVERY' | 'PICKUP' | 'ORDER';
  items: IOrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'PENDING' | 'CONFIRMED' | 'IN_PREPARATION' | 'COMPLETED' | 'CANCELLED';
  paymentMethod: 'COD' | 'PICKUP' | 'CARD';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
  transactionId?: string;
  notes?: string;
  date?: string;
  time?: string;
}

const orderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    customerName: {
      type: String,
      required: [true, 'Please provide customer name'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please provide phone number'],
      trim: true,
      index: true,
    },
    email: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    orderType: {
      type: String,
      enum: ['DELIVERY', 'PICKUP', 'ORDER'],
      default: 'DELIVERY',
    },
    items: [
      {
        itemId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 },
        type: { type: String, enum: ['dish', 'platter'], default: 'dish' },
      },
    ],
    subtotal: {
      type: Number,
      required: true,
      default: 0,
    },
    deliveryFee: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ['PENDING', 'CONFIRMED', 'IN_PREPARATION', 'COMPLETED', 'CANCELLED'],
      default: 'PENDING',
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: ['COD', 'PICKUP', 'CARD'],
      default: 'COD',
    },
    paymentStatus: {
      type: String,
      enum: ['PENDING', 'PAID', 'FAILED'],
      default: 'PENDING',
    },
    transactionId: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
      index: true,
    },
    time: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOrder>('Order', orderSchema);
