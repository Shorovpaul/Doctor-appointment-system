import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async (): Promise<void> => {
  try {
    const connStr = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/doctor_appointment';
    await mongoose.connect(connStr);
    console.log('MongoDB Connected Successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};