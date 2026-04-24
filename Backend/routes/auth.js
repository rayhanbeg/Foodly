import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const getAuthResponse = (user) => ({
  token: generateToken(user),
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    address: user.address || '',
    role: user.role
  }
});

// Register Route
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').matches(/^\d{10}$/).withMessage('Phone must be 10 digits'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, phone, password } = req.body;

      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      user = new User({ name, email, phone, password, authProvider: 'local' });
      await user.save();

      res.status(201).json(getAuthResponse(user));
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Login Route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      if (!user.password) {
        return res.status(400).json({ message: 'Please continue with Google login' });
      }

      const isPasswordValid = await user.matchPassword(password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      res.json(getAuthResponse(user));
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Google Login / Register Route
router.post(
  '/google',
  [body('credential').notEmpty().withMessage('Google credential is required')],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { credential } = req.body;
      const verifyResponse = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);

      if (!verifyResponse.ok) {
        return res.status(401).json({ message: 'Invalid Google token' });
      }

      const payload = await verifyResponse.json();
      const googleClientId = process.env.GOOGLE_CLIENT_ID;

      if (googleClientId && payload.aud !== googleClientId) {
        return res.status(401).json({ message: 'Google token client mismatch' });
      }

      if (!payload.email || payload.email_verified !== 'true') {
        return res.status(401).json({ message: 'Google email is not verified' });
      }

      let user = await User.findOne({ email: payload.email });

      if (!user) {
        user = new User({
          name: payload.name || payload.email.split('@')[0],
          email: payload.email,
          authProvider: 'google',
          googleId: payload.sub
        });
      } else {
        user.googleId = payload.sub;
        user.name = payload.name || user.name;
      }

      await user.save();

      res.json(getAuthResponse(user));
    } catch (error) {
      console.error('Google auth error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;