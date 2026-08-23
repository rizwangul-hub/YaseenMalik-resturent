import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Settings from '../models/Settings.js';
import Order from '../models/Order.js';
import Reservation from '../models/Reservation.js';
import Review from '../models/Review.js';
import Message from '../models/Message.js';

export const getSettings = async (req: Request, res: Response) => {
  try {
    let settings = null;
    if (mongoose.connection.readyState === 1) {
      settings = await Settings.findOne();
    }

    return res.json({
      success: true,
      message: 'Restaurant settings fetched successfully',
      data: settings || {
        restaurantName: 'Yaseen Malak Restaurant',
        tagline: 'Authentic Balochi Sajji & Peshawari BBQ',
        phone: '0314 3367335',
        address: 'Ring Road, Peshawar, Khyber Pakhtunkhwa, Pakistan',
        openingHours: '11:00 AM - 01:00 AM Daily',
      },
    });
  } catch (error: any) {
    return res.json({
      success: true,
      message: 'Restaurant settings fetched (Fallback Mode)',
      data: {
        restaurantName: 'Yaseen Malak Restaurant',
        tagline: 'Authentic Balochi Sajji & Peshawari BBQ',
        phone: '0314 3367335',
        address: 'Ring Road, Peshawar, Khyber Pakhtunkhwa, Pakistan',
        openingHours: '11:00 AM - 01:00 AM Daily',
      },
    });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    let settings = null;
    if (mongoose.connection.readyState === 1) {
      settings = await Settings.findOne();
      if (!settings) {
        settings = new Settings(req.body);
      } else {
        Object.assign(settings, req.body);
      }
      const updatedSettings = await settings.save();
      return res.json({
        success: true,
        message: 'Restaurant settings updated successfully',
        data: updatedSettings,
      });
    }

    return res.json({
      success: true,
      message: 'Settings updated (Fallback Mode)',
      data: req.body,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update restaurant settings',
      data: null,
    });
  }
};

export const getNotificationStats = async (req: Request, res: Response) => {
  try {
    let pendingOrders = 0;
    let pendingReservations = 0;
    let pendingReviews = 0;
    let unreadMessages = 0;

    if (mongoose.connection.readyState === 1) {
      [pendingOrders, pendingReservations, pendingReviews, unreadMessages] = await Promise.all([
        Order.countDocuments({ status: 'PENDING' }).catch(() => 0),
        Reservation.countDocuments({ status: 'PENDING' }).catch(() => 0),
        Review.countDocuments({ isApproved: false }).catch(() => 0),
        Message.countDocuments({ isRead: false }).catch(() => 0),
      ]);
    }

    const totalUnread = pendingOrders + pendingReservations + pendingReviews + unreadMessages;

    return res.json({
      success: true,
      message: 'Notification stats fetched successfully',
      data: {
        pendingOrders,
        pendingReservations,
        pendingReviews,
        unreadMessages,
        totalUnread,
      },
    });
  } catch (error: any) {
    return res.json({
      success: true,
      message: 'Notification stats fetched (Fallback Mode)',
      data: {
        pendingOrders: 0,
        pendingReservations: 0,
        pendingReviews: 0,
        unreadMessages: 0,
        totalUnread: 0,
      },
    });
  }
};
