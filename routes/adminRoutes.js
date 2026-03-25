const express = require("express");
const router = express.Router();

const { creditWallet, debitWallet } = require("../controllers/walletController");
const clientAuth = require("../middleware/clientAuth"); // IMPORTANT

router.post("/wallet/credit", clientAuth, creditWallet);
router.post("/wallet/debit", clientAuth, debitWallet);

module.exports = router;