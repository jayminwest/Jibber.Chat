require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const paymentRoutes = require('./routes/payment');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes that need raw body for Stripe webhook
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));

// Routes that need parsed JSON body
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/payment', paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
