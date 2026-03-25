const { Wallet, Ledger } = require('../models');

exports.creditWallet = async (req, res) => {
  try {
    const clientId = req.client.client_id;
    const amount = Number(req.body.amount);

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    let wallet = await Wallet.findOne({ where: { client_id: clientId } });

    if (!wallet) {
      wallet = await Wallet.create({ client_id: clientId, balance: 0 });
    }

    wallet.balance += amount;
    await wallet.save();

    await Ledger.create({ client_id: clientId, type: 'credit', amount });

    res.json({ balance: wallet.balance });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.debitWallet = async (req, res) => {
  try {
    const clientId = req.client.client_id;
    const amount = Number(req.body.amount);

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const wallet = await Wallet.findOne({ where: { client_id: clientId } });

    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    wallet.balance -= amount;
    await wallet.save();

    await Ledger.create({ client_id: clientId, type: 'debit', amount });

    res.json({ balance: wallet.balance });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getBalance = async (req, res) => {
  const wallet = await Wallet.findOne({
    where: { client_id: req.client.client_id }
  });

  res.json({ balance: wallet ? wallet.balance : 0 });
};