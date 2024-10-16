const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoute');
const courtsRoutes = require('./routes/courtRoutes');
const centreRoutes = require('./routes/centreRoutes');

dotenv.config();
const app = express();
connectDB();

// Middleware to parse incoming request bodies
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin/bookings',bookingRoutes);
app.use('/api/admin/courts',courtsRoutes);
app.use('/api/admin/centres', centreRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/courts',courtsRoutes);
app.use('/api/centres', centreRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});