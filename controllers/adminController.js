const { Wallet, Ledger } = require("../models");

exports.creditWallet = async (req, res) => {
  try {

    const client_id = Number(req.body.client_id);
    const amount = Number(req.body.amount);

    let wallet = await Wallet.findOne({ where: { client_id } });

    if (!wallet) {
      wallet = await Wallet.create({
        client_id,
        balance: 0
      });
    }

    wallet.balance = (wallet.balance || 0) + amount;
    await wallet.save();

    await Ledger.create({
      client_id,
      type: "credit",
      amount
    });

    res.json({
      message: "Wallet credited",
      balance: wallet.balance
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.debitWallet = async (req, res) => {
  try {
    const { client_id, amount } = req.body;

    const wallet = await Wallet.findOne({ where: { client_id } });

    if (wallet.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    wallet.balance -= amount;
    await wallet.save();

    await Ledger.create({
      client_id,
      type: "debit",
      amount
    });

    res.json({ message: "Wallet debited", balance: wallet.balance });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};