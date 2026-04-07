import express from 'express';
import { body, validationResult } from 'express-validator';
import ContactMessage from '../models/ContactMessage.js';
import { verifyToken, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Submit contact message
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, phone, subject, message } = req.body;

      const contactMessage = new ContactMessage({
        name,
        email,
        phone,
        subject,
        message
      });

      await contactMessage.save();
      res.status(201).json({ message: 'Thank you for contacting us. We will get back to you soon.' });
    } catch (error) {
      console.error('Contact submission error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Get all contact messages (Admin only)
router.get('/', verifyToken, adminOnly, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Get contact messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark message as read (Admin only)
router.patch('/:id/read', verifyToken, adminOnly, async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status: 'read' },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json(message);
  } catch (error) {
    console.error('Update message status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete contact message (Admin only)
router.delete('/:id', verifyToken, adminOnly, async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
