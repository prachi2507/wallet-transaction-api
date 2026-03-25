const { sequelize, Wallet, Order, Ledger } = require('../models');
const { callFulfillment } = require('../services/fulfillmentService');

exports.createOrder = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const clientId = req.client.client_id;
    const amount = Number(req.body.amount);

    if (!amount || isNaN(amount) || amount <= 0) {
      await t.rollback();
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const wallet = await Wallet.findOne({
      where: { client_id: clientId },
      transaction: t,
      lock: true
    });

    if (!wallet || wallet.balance < amount) {
      await t.rollback();
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    wallet.balance -= amount;
    await wallet.save({ transaction: t });

    const order = await Order.create({
      client_id: clientId,
      amount,
      status: 'pending'
    }, { transaction: t });

    await Ledger.create({
      client_id: clientId,
      type: 'order',
      amount
    }, { transaction: t });

    let fulfillmentId = null;

    try {
      fulfillmentId = await callFulfillment(clientId, order.id);
    } catch {}

    order.fulfillment_id = fulfillmentId;
    order.status = fulfillmentId ? 'fulfilled' : 'failed';

    await order.save({ transaction: t });

    await t.commit();

    res.json(order);

  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};

exports.getOrder = async (req, res) => {
  const order = await Order.findOne({
    where: {
      id: req.params.order_id,
      client_id: req.client.client_id
    }
  });

  if (!order) return res.status(404).json({ error: 'Not found' });

  res.json(order);
};