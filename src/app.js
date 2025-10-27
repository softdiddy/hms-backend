require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.routes');
const doctorRoutes = require('./routes/doctor.routes');
const locationRoutes = require('./routes/location.routes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// ✅ Test route to confirm server works
app.get('/', (req, res) => {
  res.status(200).json({ message: '✅ HMS API is running fine' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/locations', locationRoutes);

// Catch-all (for 404)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;
