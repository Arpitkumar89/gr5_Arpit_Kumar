import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error('MONGO_URI is not defined in .env');

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ DB Connection Failed:', err.message);
    process.exit(1);
  }
};

export default connectDB;
