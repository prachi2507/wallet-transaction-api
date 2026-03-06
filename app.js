const express = require("express");
const { sequelize } = require("./models");

const adminRoutes = require("./routes/adminRoutes");
const orderRoutes = require("./routes/orderRoutes");
const walletRoutes = require("./routes/walletRoutes");

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    message: "Wallet Transaction API Running",
    endpoints: [
      "POST /admin/wallet/credit",
      "POST /admin/wallet/debit",
      "POST /orders",
      "GET /orders/:order_id",
      "GET /wallet/balance"
    ]
  });
});

app.use("/admin", adminRoutes);
app.use("/orders", orderRoutes);
app.use("/wallet", walletRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});