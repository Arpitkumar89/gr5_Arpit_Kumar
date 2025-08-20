import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../config/db.js'; // ✅ Correct relative path to DB connection
import orderRoutes from '../routes/orderRoutes.js'; // ✅ Routes file

dotenv.config(); // ✅ Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(cors());               // Allow Cross-Origin requests
app.use(express.json());       // Parse incoming JSON data

// ✅ API Routes
app.use('/api/orders', orderRoutes); // Grouping order-related routes

// ✅ Health check/default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
