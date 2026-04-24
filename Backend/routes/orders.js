import express from 'express';
import { body, validationResult } from 'express-validator';
import Order from '../models/Order.js';
import Food from '../models/Food.js';
import User from '../models/User.js';
import { verifyToken, adminOnly } from '../middleware/auth.js';
import {
  PAYMENT_METHODS,
  SERVICE_CHARGE_RATE,
  VAT_RATE,
  DELIVERY_CHARGE,
  FREE_DELIVERY_THRESHOLD
} from '../constants/business.js';

const router = express.Router();

// Create new order
router.post(
  '/',
  verifyToken,
  [
    body('items').isArray().notEmpty().withMessage('Items array is required'),
    body('deliveryAddress').trim().notEmpty().withMessage('Delivery address is required'),
    body('phone').matches(/^\d{10}$/).withMessage('Phone number must be 10 digits'),
    body('paymentMethod').isIn(PAYMENT_METHODS).withMessage('Invalid payment method')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { items, deliveryAddress, paymentMethod, phone, notes } = req.body;

      // Validate items and calculate total
      let subtotalAmount = 0;
      const processedItems = [];

      for (const item of items) {
        const food = await Food.findById(item.foodId);
        if (!food) {
          return res.status(404).json({ message: `Food item not found: ${item.foodId}` });
        }
        if (!food.available) {
          return res.status(400).json({ message: `${food.name} is currently unavailable` });
        }

        const subtotal = food.price * item.quantity;
        subtotalAmount += subtotal;

        processedItems.push({
          foodId: food._id,
          foodName: food.name,
          price: food.price,
          quantity: item.quantity,
          subtotal
        });
      }

      const serviceCharge = Number((subtotalAmount * SERVICE_CHARGE_RATE).toFixed(2));
      const vatAmount = Number((subtotalAmount * VAT_RATE).toFixed(2));
      const deliveryCharges = subtotalAmount >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
      const totalAmount = Number((subtotalAmount + serviceCharge + vatAmount + deliveryCharges).toFixed(2));

      await User.findByIdAndUpdate(
        req.userId,
        {
          phone,
          address: deliveryAddress
        },
        { runValidators: true }
      );

      const order = new Order({
        userId: req.userId,
        items: processedItems,
        deliveryAddress,
        subtotalAmount,
        serviceCharge,
        vatAmount,
        totalAmount,
        deliveryCharges,
        paymentMethod,
        notes,
        estimatedDeliveryTime: new Date(Date.now() + 40 * 60000)
      });

      await order.save();
      res.status(201).json(order);
    } catch (error) {
      console.error('Create order error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Get user's orders
router.get('/user/my-orders', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .populate('items.foodId', 'name image')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single order
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.foodId', 'name image');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user is owner or admin
    if (order.userId.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status (Admin only)
router.put('/:id/status', verifyToken, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update payment status (Admin only)
router.put('/:id/payment', verifyToken, adminOnly, async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    const validStatuses = ['pending', 'completed', 'failed'];

    if (!validStatuses.includes(paymentStatus)) {
      return res.status(400).json({ message: 'Invalid payment status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Update payment status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all orders (Admin only)
router.get('/', verifyToken, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email phone')
      .populate('items.foodId', 'name image')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;