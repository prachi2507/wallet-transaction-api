const router = require('express').Router();
const { getBalance } = require('../controllers/walletController');
const auth = require('../middleware/clientAuth');

router.get('/balance', auth, getBalance);

module.exports = router;