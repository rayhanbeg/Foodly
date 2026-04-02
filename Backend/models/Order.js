import mongoose from 'mongoose';
import { BRANCHES, PAYMENT_METHODS } from '../constants/business.js';

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Food',
          required: true
        },
        foodName: String,
        price: Number,
        quantity: {
          type: Number,
          required: true,
          min: 1
        },
        subtotal: Number
      }
    ],
    deliveryAddress: {
      type: String,
      required: [true, 'Please provide delivery address']
    },
    branchCode: {
      type: String,
      required: [true, 'Please provide branch code'],
      enum: BRANCHES.map((branch) => branch.code)
    },
    branchName: {
      type: String,
      required: [true, 'Please provide branch name']
    },
    subtotalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    serviceCharge: {
      type: Number,
      default: 0
    },
    vatAmount: {
      type: Number,
      default: 0
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    deliveryCharges: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
      default: 'pending'
    },
    paymentMethod: {
      type: String,
      enum: PAYMENT_METHODS,
      required: true
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    estimatedDeliveryTime: Date,
    notes: String
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);