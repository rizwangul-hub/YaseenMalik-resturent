import { Request, Response } from 'express';
import Settings from '../models/Settings';
import Order from '../models/Order';
import Reservation from '../models/Reservation';
import Review from '../models/Review';
import Message from '../models/Message';

export const getSettings = async (req: Request, res: Response) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }

    return res.json({
      success: true,
      message: 'Restaurant settings fetched successfully',
      data: settings,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch restaurant settings',
      data: null,
    });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    let settings = await Settings.findOne();
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
    const [pendingOrders, pendingReservations, pendingReviews, unreadMessages] = await Promise.all([
      Order.countDocuments({ status: 'PENDING' }),
      Reservation.countDocuments({ status: 'PENDING' }),
      Review.countDocuments({ isApproved: false }),
      Message.countDocuments({ isRead: false }),
    ]);

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
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch notification stats',
      data: null,
    });
  }
};
