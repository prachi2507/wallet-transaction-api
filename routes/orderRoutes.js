const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const clientAuth = require("../middleware/clientAuth");

router.post("/", clientAuth, orderController.createOrder);
router.get("/:order_id", clientAuth, orderController.getOrder);

module.exports = router;