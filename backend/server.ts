import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import { apiLimiter } from './middleware/rateLimiter';

// Route imports
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import menuRoutes from './routes/menuRoutes';
import categoryRoutes from './routes/categoryRoutes';
import platterRoutes from './routes/platterRoutes';
import galleryRoutes from './routes/galleryRoutes';
import reviewRoutes from './routes/reviewRoutes';
import orderRoutes from './routes/orderRoutes';
import reservationRoutes from './routes/reservationRoutes';
import settingsRoutes from './routes/settingsRoutes';
import messageRoutes from './routes/messageRoutes';
import uploadRoutes from './routes/uploadRoutes';

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// 1. Enable CORS first for all origins & methods (supports localhost, 127.0.0.1, and LAN IPs)
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

// 3. General Rate Limiter for all API routes (skips OPTIONS preflight)
app.use('/api', apiLimiter);

// Health Check
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

app.listen(PORT, () => {
  console.log(`[Server] Yaseen Malak Restaurant Backend running on port ${PORT}`);
});

export default app;
