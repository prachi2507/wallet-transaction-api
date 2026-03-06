const { sequelize, Wallet, Order, Ledger } = require("../models");
const { callFulfillment } = require("../services/fulfillmentService");

exports.createOrder = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const clientId = req.clientId;
    const amount = Number(req.body.amount);

    const wallet = await Wallet.findOne({
      where: { client_id: clientId },
      transaction,
      lock: true
    });

    if (wallet.balance < amount) {
      await transaction.rollback();
      return res.status(400).json({ error: "Insufficient wallet balance" });
    }

    wallet.balance -= amount;
    await wallet.save({ transaction });

    const order = await Order.create(
      {
        client_id: clientId,
        amount: amount,
        status: "pending"
      },
      { transaction }
    );

    await Ledger.create(
      {
        client_id: clientId,
        type: "order",
        amount
      },
      { transaction }
    );

    const fulfillmentId = await callFulfillment(clientId, order.id);

    order.fulfillment_id = fulfillmentId;
    order.status = "fulfilled";

    await order.save({ transaction });

    await transaction.commit();

    res.json(order);

  } catch (err) {
    await transaction.rollback();
    res.status(500).json({ error: err.message });
  }
};

exports.getOrder = async (req, res) => {
  const clientId = req.clientId;
  const { order_id } = req.params;

  const order = await Order.findOne({
    where: { id: order_id, client_id: clientId }
  });

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.json(order);
};