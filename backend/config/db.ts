import mongoose from 'mongoose';

let isConnected = 0;

export const connectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState >= 1 || isConnected === 1) {
    return;
  }

  try {
    const connStr =
      process.env.MONGO_URI ||
      process.env.MONGO_URL ||
      'mongodb+srv://rizwangul535_db_user:LYGTNebZbKQQ0csd@cluster0.wun93hu.mongodb.net/yaseen_malak_db';

    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = conn.connection.readyState;
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
  } catch (error: any) {
    console.warn(`[MongoDB Notice]: Connection failed (${error.message}). API will run in fallback mode.`);
  }
};
