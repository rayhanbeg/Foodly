import express from 'express';
import { body, validationResult } from 'express-validator';
import Newsletter from '../models/Newsletter.js';
import { verifyToken, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Subscribe to newsletter
router.post(
  '/subscribe',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('name').optional().trim()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, name } = req.body;

      // Check if already subscribed
      let subscriber = await Newsletter.findOne({ email });
      if (subscriber) {
        if (subscriber.status === 'subscribed') {
          return res.status(409).json({ message: 'Email already subscribed' });
        }
        // Resubscribe if previously unsubscribed
        subscriber.status = 'subscribed';
        if (name) subscriber.name = name;
        await subscriber.save();
        return res.json({ message: 'Successfully subscribed to newsletter' });
      }

      const newSubscriber = new Newsletter({
        email,
        name
      });

      await newSubscriber.save();
      res.status(201).json({ message: 'Successfully subscribed to newsletter' });
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Unsubscribe from newsletter
router.post(
  '/unsubscribe',
  [body('email').isEmail().withMessage('Valid email is required')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email } = req.body;

      const subscriber = await Newsletter.findOne({ email });
      if (!subscriber) {
        return res.status(404).json({ message: 'Email not found in subscribers' });
      }

      subscriber.status = 'unsubscribed';
      await subscriber.save();

      res.json({ message: 'Successfully unsubscribed from newsletter' });
    } catch (error) {
      console.error('Newsletter unsubscribe error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Get all subscribers (Admin only)
router.get('/', verifyToken, adminOnly, async (req, res) => {
  try {
    const subscribers = await Newsletter.find({ status: 'subscribed' }).sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
