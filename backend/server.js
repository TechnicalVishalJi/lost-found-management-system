const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected to', process.env.MONGO_URI))
  .catch(err => console.error(err));

// Routes
app.use('/api', require('./routes/authRoutes'));
app.use('/api', require('./routes/itemRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
