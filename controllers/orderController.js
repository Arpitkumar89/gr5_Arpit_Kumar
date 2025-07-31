import Order from '../models/Order1.js';
import Customer from '../models/Customer1.js';
import Item from '../models/Items.js';

// ✅ 1. Place a new order
export const placeOrder = async (req, res) => {
  const { customerId, items } = req.body;

  try {
    // Validate customer
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Optionally validate items (ensure they exist)
    for (const entry of items) {
      const itemExists = await Item.findById(entry.itemId);
      if (!itemExists) {
        return res.status(400).json({ error: `Item not found: ${entry.itemId}` });
      }
    }

    const order = await Order.create({ customerId, items });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ 2. Get all orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customerId')
      .populate('items.itemId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ 3. Get all orders for a specific customer
export const getCustomerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.params.id })
      .populate('items.itemId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ 4. Update order status with transition validation
export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const transitions = {
      Pending: ['Processing', 'Cancelled'],
      Processing: ['Shipped', 'Cancelled'],
      Shipped: ['Delivered'],
      Delivered: [],
      Cancelled: [],
    };

    if (!transitions[order.status].includes(status)) {
      return res.status(400).json({
        error: `Invalid status transition from ${order.status} to ${status}`,
      });
    }

    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ 5. Cancel an order
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    order.status = 'Cancelled';
    await order.save();
    res.json({ message: 'Order cancelled successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
