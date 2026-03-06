const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Wallet = sequelize.define("Wallet", {
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  balance: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  }
});

module.exports = Wallet;