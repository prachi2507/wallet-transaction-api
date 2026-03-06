const { sequelize, Client, Wallet } = require("./models");

async function seed() {
  await sequelize.sync({ force: true });

  const client = await Client.create({ name: "Test Client" });

  await Wallet.create({
    client_id: client.id,
    balance: 1000
  });

  console.log("Seed complete");
}

seed();