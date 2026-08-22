import mongoose, { Document, Schema } from 'mongoose';

export interface IReservation extends Document {
  customerName: string;
  phone: string;
  email?: string;
  guests: string;
  date: string;
  time: string;
  seatingPreference: 'family-hall' | 'main-dining' | 'vip-booth';
  specialRequests?: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
}

const reservationSchema = new Schema<IReservation>(
  {
    customerName: {
      type: String,
      required: [true, 'Please add customer name'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please add phone number'],
      trim: true,
    },
    email: {
      type: String,
      default: '',
    },
    guests: {
      type: String,
      required: [true, 'Please add number of guests'],
    },
    date: {
      type: String,
      required: [true, 'Please add reservation date'],
    },
    time: {
      type: String,
      required: [true, 'Please add reservation time'],
    },
    seatingPreference: {
      type: String,
      enum: ['family-hall', 'main-dining', 'vip-booth'],
      default: 'family-hall',
    },
    specialRequests: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'],
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IReservation>('Reservation', reservationSchema);
