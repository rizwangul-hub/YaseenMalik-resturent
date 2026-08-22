import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    name: {
      type: String,
      required: [true, 'Please add your name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add your email'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please add your phone number'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Please add a message'],
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IMessage>('Message', messageSchema);
