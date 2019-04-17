const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');
const UserCtrl = require('../controllers/userController');

router.get('', UserCtrl.authMiddleWare, PaymentController.getPendingPayments);

router.post('/accept', UserCtrl.authMiddleWare, PaymentController.confirmPayment);

router.post('/decline', UserCtrl.authMiddleWare, PaymentController.declinePayment);

module.exports = router;