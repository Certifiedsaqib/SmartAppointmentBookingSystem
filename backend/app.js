const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const appointmentRoutes = require('./routes/appointmentRoutes');
const providerRoutes = require('./routes/providerRoutes');
const authRoutes = require('./routes/authRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/appointments', appointmentRoutes);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Smart Appointment Booking API' });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
