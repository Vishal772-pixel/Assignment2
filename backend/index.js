import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Transaction } from './models/Transaction.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {

}).then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ Mongo Error:', err));


app.post('/api/payment', async (req, res) => {
  const { amount, currency } = req.body;

  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid amount' });
  }

  const allowedCurrencies = ['INR', 'USD', 'EUR'];
  if (!allowedCurrencies.includes(currency)) {
    return res.status(400).json({ success: false, message: 'Invalid currency' });
  }

  try {
    const transaction = await Transaction.create({ amount, currency });
    res.status(201).json({ success: true, message: 'Payment stored', transaction });
  } catch (err) {
    res.status(500).json({ success: false, message: 'DB error', error: err.message });
  }
});


app.get('/api/payments', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ time: -1 });
    res.json({ success: true, data: transactions });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetch failed', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
