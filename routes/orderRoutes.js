import express from 'express';
import {
  placeOrder,
  getAllOrders,
  getCustomerOrders,
  updateOrderStatus,
  cancelOrder,
} from '../controllers/orderController.js'; // ✅ Correct folder name

const router = express.Router();

// Customer: Place a new order
router.post('/orders', placeOrder);

// Admin: Get all orders
router.get('/orders', getAllOrders);

// Admin: Get all orders for a specific customer
router.get('/customers/:id/orders', getCustomerOrders);

// Admin: Update order status
router.patch('/orders/:id/status', updateOrderStatus);

// Admin: Cancel an order
router.delete('/orders/:id', cancelOrder);

export default router; // ✅ Required for import in server.js
