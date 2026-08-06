const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const bookingRoutes = require('./routes/bookings');

const app = express();

// Middleware
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://event-frontend-sxpv-lm9ealprz-ankit-kumar-singh-s-jsrh.vercel.app';

if (process.env.NODE_ENV === 'production') {
  app.use(
    cors({
      origin: FRONTEND_URL,
      credentials: true,
    })
  );
} else {
  // Allow all origins in development for ease of local testing
  app.use(cors());
}

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);


// ✅ Add this
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Eventora Backend is Running 🚀"
  });
});

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/eventora')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
