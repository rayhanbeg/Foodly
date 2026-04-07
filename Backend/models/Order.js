import mongoose from 'mongoose';

const PAYMENT_METHODS = ['cash_on_delivery', 'credit_card', 'debit_card', 'digital_wallet'];
const ORDER_STATUSES = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];

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
      default: 50
    },
    status: {
      type: String,
      enum: ORDER_STATUSES,
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
