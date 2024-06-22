const express = require('express');

const feedController = require('./controllers');

const router = express.Router();

router.post('/order', feedController.createOrder);
router.put('/order', feedController.updateOrder);
router.get('/order/:customerId/:pickupDate', feedController.getOrder);

module.exports = router;
