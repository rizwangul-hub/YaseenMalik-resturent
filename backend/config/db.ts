import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    // Disable command buffering so queries fail fast if DB is disconnected instead of hanging
    mongoose.set('bufferCommands', false);

    const connStr = process.env.MONGO_URL || 'mongodb+srv://rizwangul535_db_user:LYGTNebZbKQQ0csd@cluster0.wun93hu.mongodb.net/yaseen_malak_db';
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 3000, // Timeout after 3s instead of 30s
    });
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.warn(`[MongoDB Notice]: Connection failed (${error.message}). API will run in fallback mode.`);
  }
};
