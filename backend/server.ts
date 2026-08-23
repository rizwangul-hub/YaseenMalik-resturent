import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { apiLimiter } from './middleware/rateLimiter.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import platterRoutes from './routes/platterRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

// Connect to Database immediately on launch
connectDB();

const app = express();

// 1. Enable CORS first for all origins & methods (supports localhost, 127.0.0.1, Vercel, and LAN IPs)
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  })
);

// 2. Security & Parsing Middleware
app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: false }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// 3. Ensure MongoDB connection is ready before processing requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (e) {}
  next();
});

// 4. General Rate Limiter for all API routes (skips OPTIONS preflight)
app.use('/api', apiLimiter);

// Root & Health Check Endpoints
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Yaseen Malak Restaurant Backend API is Live on Vercel 🚀',
    endpoints: {
      health: '/api/health',
      menu: '/api/menu',
      platters: '/api/platters',
      orders: '/api/orders',
      auth: '/api/auth/login',
    },
    timestamp: new Date().toISOString(),
  });
});

app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Yaseen Malak Restaurant API Endpoint Base',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Yaseen Malak Restaurant API is operational',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/platters', platterRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/upload', uploadRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[Server] Yaseen Malak Restaurant Backend running on port ${PORT}`);
  });
}

export default app;
