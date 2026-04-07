import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    phone: {
      type: String,
      trim: true
    },
    subject: {
      type: String,
      required: [true, 'Please provide a subject'],
      trim: true,
      maxlength: [200, 'Subject cannot be more than 200 characters']
    },
    message: {
      type: String,
      required: [true, 'Please provide a message'],
      maxlength: [2000, 'Message cannot be more than 2000 characters']
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied'],
      default: 'new'
    }
  },
  { timestamps: true }
);

export default mongoose.model('ContactMessage', contactMessageSchema);
