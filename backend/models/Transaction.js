import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 0.01,
  },
  currency: {
    type: String,
    enum: ['INR', 'USD', 'EUR'],
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

export const Transaction = mongoose.model('Transaction', transactionSchema);
