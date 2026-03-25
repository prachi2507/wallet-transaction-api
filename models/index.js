const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const Wallet = sequelize.define('Wallet', {
  client_id: DataTypes.STRING,
  balance: { type: DataTypes.FLOAT, defaultValue: 0 }
});

const Order = sequelize.define('Order', {
  client_id: DataTypes.STRING,
  amount: DataTypes.FLOAT,
  status: DataTypes.STRING,
  fulfillment_id: DataTypes.STRING
});

const Ledger = sequelize.define('Ledger', {
  client_id: DataTypes.STRING,
  type: DataTypes.STRING,
  amount: DataTypes.FLOAT
});

module.exports = { sequelize, Wallet, Order, Ledger };