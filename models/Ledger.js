const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Ledger = sequelize.define("Ledger", {
  client_id: DataTypes.INTEGER,
  type: DataTypes.STRING,
  amount: DataTypes.FLOAT
});

module.exports = Ledger;