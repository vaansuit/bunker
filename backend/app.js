const express = require('express');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

const authRoutes = require('./routes/authRoutes');
const streamsRoutes = require('./routes/streamRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/streams', streamsRoutes);
// Route for testing
app.get('/', (req, res) => {
  res.send('You entered in the BUNKER');
});

// Starting Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Bunker is Running on PORT ${PORT}`);
});
