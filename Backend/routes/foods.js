import express from 'express';
import { body, validationResult } from 'express-validator';
import Food from '../models/Food.js';
import { verifyToken, adminOnly } from '../middleware/auth.js';
import { uploadImageToCloudinary } from '../config/cloudinary.js';

const router = express.Router();

// Get all foods with optional filtering
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const foods = await Food.find(query).sort({ createdAt: -1 });
    res.json(foods);
  } catch (error) {
    console.error('Get foods error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Upload image to Cloudinary (Admin only)
router.post('/upload', verifyToken, adminOnly, async (req, res) => {
  try {
    const { imageData } = req.body;

    if (!imageData) {
      return res.status(400).json({ message: 'Image data is required' });
    }

    const uploadedImage = await uploadImageToCloudinary(imageData);
    res.status(201).json(uploadedImage);
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ message: error.message || 'Image upload failed' });
  }
});

// Get single food by ID
router.get('/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json(food);
  } catch (error) {
    console.error('Get food error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create food (Admin only)
router.post(
  '/',
  verifyToken,
  adminOnly,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').isIn(['appetizers', 'mains', 'desserts', 'beverages', 'sides']).withMessage('Invalid category'),
    body('image').isURL().withMessage('Valid image URL is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, description, price, category, image } = req.body;
      const food = new Food({ name, description, price, category, image });
      await food.save();
      res.status(201).json(food);
    } catch (error) {
      console.error('Create food error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Update food (Admin only)
router.put('/:id', verifyToken, adminOnly, async (req, res) => {
  try {
    const { name, description, price, category, image, available } = req.body;
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, image, available },
      { new: true, runValidators: true }
    );

    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    res.json(food);
  } catch (error) {
    console.error('Update food error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete food (Admin only)
router.delete('/:id', verifyToken, adminOnly, async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json({ message: 'Food deleted successfully' });
  } catch (error) {
    console.error('Delete food error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add review to food
router.post('/:id/reviews', verifyToken, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    const review = {
      userId: req.userId,
      userName: req.body.userName || 'Anonymous',
      rating,
      comment
    };

    food.reviews.push(review);
    
    // Update rating
    const totalRating = food.reviews.reduce((sum, r) => sum + r.rating, 0);
    food.rating = totalRating / food.reviews.length;

    await food.save();
    res.status(201).json(food);
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
