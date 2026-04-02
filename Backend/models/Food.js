import mongoose from 'mongoose';
import { BRANCHES, DEFAULT_BRANCH_CODE, getBranchByCode } from '../constants/business.js';

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
    branchCode: {
      type: String,
      required: [true, 'Please provide branch code'],
      enum: BRANCHES.map((branch) => branch.code),
      default: DEFAULT_BRANCH_CODE
    },
    branchName: {
      type: String,
      required: [true, 'Please provide branch name'],
      default: getBranchByCode(DEFAULT_BRANCH_CODE)?.name
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

foodSchema.pre('validate', function (next) {
  if (this.branchCode) {
    const branch = getBranchByCode(this.branchCode);
    if (branch) {
      this.branchName = branch.name;
    }
  }
  next();
});

export default mongoose.model('Food', foodSchema);