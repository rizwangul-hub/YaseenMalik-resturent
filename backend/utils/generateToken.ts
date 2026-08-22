import { Response } from 'express';
import jwt from 'jsonwebtoken';

export const generateToken = (res: Response, userId: string): string => {
  const secret = process.env.JWT_SECRET || 'yaseen_malak_jwt_secret_key_2026_super_secure';
  const token = jwt.sign({ userId }, secret, {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return token;
};
