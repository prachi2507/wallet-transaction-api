const router = require('express').Router();
const { createOrder, getOrder } = require('../controllers/orderController');
const auth = require('../middleware/clientAuth');

router.post('/', auth, createOrder);
router.get('/:order_id', auth, getOrder);

module.exports = router;