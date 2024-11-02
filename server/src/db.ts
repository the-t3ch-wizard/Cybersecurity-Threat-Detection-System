import mongoose from 'mongoose';
import { MONGO_URI } from './config/config';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
    });
    console.log(`MongoDB connected on: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error while connecting database: ${error}`);
  }
};

export default connectDB;
