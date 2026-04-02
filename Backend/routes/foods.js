import express from 'express';
import { body, validationResult } from 'express-validator';
import Food from '../models/Food.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import { verifyToken, adminOnly } from '../middleware/auth.js';
import { uploadImageToCloudinary } from '../config/cloudinary.js';
import { BRANCHES, DEFAULT_BRANCH_CODE, getBranchByCode } from '../constants/business.js';

const router = express.Router();

const sortOptions = {
  newest: { createdAt: -1 },
  rating: { rating: -1, createdAt: -1 },
  price_asc: { price: 1, createdAt: -1 },
  price_desc: { price: -1, createdAt: -1 },
  name_asc: { name: 1 }
};

router.get('/meta/branches', (_req, res) => {
  res.json(BRANCHES);
});

// Get all foods with optional filtering
router.get('/', async (req, res) => {
  try {
    const { category, search, branchCode, sort = 'newest' } = req.query;
    const query = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    if (branchCode) {
      query.branchCode = branchCode;
    }

    const sortQuery = sortOptions[sort] || sortOptions.newest;
    const foods = await Food.find(query).sort(sortQuery);
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
    body('branchCode').optional().isIn(BRANCHES.map((branch) => branch.code)).withMessage('Invalid branch'),
    body('prepTimeMinutes').optional().isInt({ min: 5, max: 120 }).withMessage('Prep time must be between 5 and 120 minutes'),
    body('image').isURL().withMessage('Valid image URL is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, description, price, category, image, branchCode = DEFAULT_BRANCH_CODE, prepTimeMinutes } = req.body;
      const food = new Food({
        name,
        description,
        price,
        category,
        image,
        branchCode,
        branchName: getBranchByCode(branchCode)?.name,
        prepTimeMinutes
      });
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
    const { name, description, price, category, image, available, branchCode, prepTimeMinutes } = req.body;
    const branch = branchCode ? getBranchByCode(branchCode) : null;
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category,
        image,
        available,
        ...(branchCode ? { branchCode, branchName: branch?.name } : {}),
        ...(prepTimeMinutes !== undefined ? { prepTimeMinutes } : {})
      },
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

// Add review to food (Only verified purchasers)
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

    const hasPurchased = await Order.exists({
      userId: req.userId,
      status: 'delivered',
      'items.foodId': food._id
    });

    if (!hasPurchased) {
      return res.status(403).json({
        message: 'Only verified users who completed a purchase can rate this food'
      });
    }

    const alreadyReviewed = food.reviews.some((review) => review.userId?.toString() === req.userId);
    if (alreadyReviewed) {
      return res.status(409).json({ message: 'You have already reviewed this food' });
    }

    const user = await User.findById(req.userId).select('name');
    const review = {
      userId: req.userId,
      userName: user?.name || 'Verified User',
      rating,
      comment
    };

    food.reviews.push(review);

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