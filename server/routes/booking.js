const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/bookingController');
const UserCtrl = require('../controllers/userController');

router.post('', UserCtrl.authMiddleWare, BookingController.createBooking);

router.get('/manage', UserCtrl.authMiddleWare, BookingController.getUserBookings);

module.exports = router;