const { Wallet } = require("../models");

exports.getBalance = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({
      where: { client_id: req.clientId }
    });

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    res.json({ balance: wallet.balance || 0 });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};