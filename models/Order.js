const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define("Order", {
  client_id: DataTypes.INTEGER,
  amount: DataTypes.FLOAT,
  status: DataTypes.STRING,
  fulfillment_id: DataTypes.STRING
});

module.exports = Order;