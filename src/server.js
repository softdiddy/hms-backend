const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// ✅ Correct paths — no "src/" prefix since you’re already inside src/
const authRoutes = require('./routes/auth.routes');
const doctorRoutes = require('./routes/doctor.routes');
const locationRoutes = require('./routes/location.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// ✅ Test route
app.get('/', (req, res) => {
  res.json({ message: '✅ HMS API is running fine' });
});

// ✅ Register routes
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/users', userRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
