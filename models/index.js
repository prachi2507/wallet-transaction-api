const sequelize = require("../config/database");

const Client = require("./Client");
const Wallet = require("./Wallet");
const Ledger = require("./Ledger");
const Order = require("./Order");

Client.hasOne(Wallet, { foreignKey: "client_id" });
Wallet.belongsTo(Client);

Client.hasMany(Ledger, { foreignKey: "client_id" });
Ledger.belongsTo(Client);

Client.hasMany(Order, { foreignKey: "client_id" });
Order.belongsTo(Client);

module.exports = {
  sequelize,
  Client,
  Wallet,
  Ledger,
  Order
};