const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Client = sequelize.define("Client", {
  name: DataTypes.STRING
});

module.exports = Client;