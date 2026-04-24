import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a food name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [500, 'Description cannot be more than 500 characters']
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: [0, 'Price cannot be negative']
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: ['appetizers', 'mains', 'desserts', 'beverages', 'sides']
    },
    prepTimeMinutes: {
      type: Number,
      min: 5,
      max: 120,
      default: 25
    },
    image: {
      type: String,
      required: [true, 'Please provide an image URL']
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    reviewCount: {
      type: Number,
      default: 0
    },
    tags: {
      type: [String],
      default: [],
      set: (values = []) =>
        [...new Set(values.map((value) => value.trim().toLowerCase()).filter(Boolean))]
    },
    reviews: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        userName: String,
        rating: Number,
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    available: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('Food', foodSchema);
