require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const { sequelize } = require('./models');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const walletRoutes = require('./routes/walletRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ message: 'API running' });
});

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/wallet', walletRoutes);
app.use('/orders', orderRoutes);

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});