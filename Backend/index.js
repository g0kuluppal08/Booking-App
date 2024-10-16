const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoute');
const courtsRoutes = require('./routes/courtRoutes');
const centreRoutes = require('./routes/centreRoutes');
import path from 'path';
const cors=require('cors');
dotenv.config();
const app = express();
connectDB();


// Middleware to parse incoming request bodies
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const __dirname=path.resolve();

app.use('/api/auth', authRoutes);
app.use('/api/admin/bookings',bookingRoutes);
app.use('/api/admin/courts',courtsRoutes);
app.use('/api/admin/centres', centreRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/courts',courtsRoutes);
app.use('/api/centres', centreRoutes);

app.use(express.static(path.join(__dirname,'/Frontend/dist')));
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'client','dist','index.html'));
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});