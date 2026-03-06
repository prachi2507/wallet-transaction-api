const express = require("express");
const router = express.Router();
const walletController = require("../controllers/walletController");
const clientAuth = require("../middleware/clientAuth");

router.get("/balance", clientAuth, walletController.getBalance);

module.exports = router;