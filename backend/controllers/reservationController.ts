import { Request, Response } from 'express';
import Reservation from '../models/Reservation';

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

    // Validate Date (not in the past)
    const reservationDate = new Date(`${date}T${time || '12:00'}`);
    const now = new Date();
    // Allow today or future
    const todayZero = new Date();
    todayZero.setHours(0, 0, 0, 0);
    const dateZero = new Date(date);
    if (dateZero < todayZero) {
      return res.status(400).json({
        success: false,
        message: 'Reservation date cannot be in the past',
        data: null,
      });
    }

    const reservation = await Reservation.create({
      customerName: nameToUse,
      phone,
      email: email || '',
      guests: String(guestCount),
      date,
      time,
      seatingPreference: seatingPreference || 'family-hall',
      specialRequests: specialRequests || '',
      status: 'PENDING',
    });

    return res.status(201).json({
      success: true,
      message: 'Table reservation request submitted successfully',
      data: reservation,
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

    const reservations = await Reservation.find(filter).sort({ createdAt: -1 });
    return res.json({
      success: true,
      message: 'Reservations fetched successfully',
      data: reservations,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch reservations',
      data: null,
    });
  }
};

export const updateReservationStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found',
        data: null,
      });
    }

    if (status) {
      reservation.status = status;
    }

    await reservation.save();
    return res.json({
      success: true,
      message: 'Reservation status updated successfully',
      data: reservation,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update reservation status',
      data: null,
    });
  }
};
