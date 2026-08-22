import { Request, Response } from 'express';
import Message from '../models/Message';

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, phone, and message are required',
        data: null,
      });
    }

    const newMessage = await Message.create({
      name,
      email,
      phone,
      message,
      isRead: false,
    });

    return res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon!',
      data: newMessage,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to send message',
      data: null,
    });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    return res.json({
      success: true,
      message: 'Messages fetched successfully',
      data: messages,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch messages',
      data: null,
    });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const msg = await Message.findById(req.params.id);
    if (!msg) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
        data: null,
      });
    }

    msg.isRead = typeof req.body.isRead === 'boolean' ? req.body.isRead : true;
    await msg.save();

    return res.json({
      success: true,
      message: 'Message status updated',
      data: msg,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update message',
      data: null,
    });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const msg = await Message.findById(req.params.id);
    if (!msg) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
        data: null,
      });
    }

    await msg.deleteOne();
    return res.json({
      success: true,
      message: 'Message deleted successfully',
      data: null,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete message',
      data: null,
    });
  }
};
