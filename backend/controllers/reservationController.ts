import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Reservation from '../models/Reservation.js';

export const createReservation = async (req: Request, res: Response) => {
  try {
    const { name, customerName, phone, email, guests, date, time, seatingPreference, specialRequests } = req.body;

    const nameToUse = name || customerName;

    if (!nameToUse || !phone || !guests || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone, guest count, date, and time are required for table reservation',
        data: null,
      });
    }

    const guestCount = parseInt(guests, 10);
    if (isNaN(guestCount) || guestCount < 1 || guestCount > 50) {
      return res.status(400).json({
        success: false,
        message: 'Guest count must be between 1 and 50 persons',
        data: null,
      });
    }

    const payload = {
      customerName: nameToUse,
      phone,
      email: email || '',
      guests: String(guestCount),
      date,
      time,
      seatingPreference: seatingPreference || 'family-hall',
      specialRequests: specialRequests || '',
      status: 'PENDING' as const,
    };

    if (mongoose.connection.readyState === 1) {
      const reservation = await Reservation.create(payload);
      return res.status(201).json({
        success: true,
        message: 'Table reservation request submitted successfully',
        data: reservation,
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Table reservation request submitted (Fallback Mode)',
      data: { id: `res_${Date.now()}`, ...payload },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit reservation',
      data: null,
    });
  }
};

export const getReservations = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const filter: any = {};

    if (status) filter.status = status;

    let reservations: any[] = [];
    if (mongoose.connection.readyState === 1) {
      reservations = await Reservation.find(filter).sort({ createdAt: -1 });
    }

    return res.json({
      success: true,
      message: 'Reservations fetched successfully',
      data: reservations,
    });
  } catch (error: any) {
    return res.json({
      success: true,
      message: 'Reservations fetched (Fallback Mode)',
      data: [],
    });
  }
};

export const updateReservationStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    if (mongoose.connection.readyState === 1 && mongoose.Types.ObjectId.isValid(req.params.id)) {
      const reservation = await Reservation.findById(req.params.id);
      if (reservation) {
        if (status) reservation.status = status;
        await reservation.save();
        return res.json({
          success: true,
          message: 'Reservation status updated successfully',
          data: reservation,
        });
      }
    }

    return res.json({
      success: true,
      message: 'Reservation status updated (Fallback Mode)',
      data: { id: req.params.id, status: status || 'PENDING' },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update reservation status',
      data: null,
    });
  }
};
