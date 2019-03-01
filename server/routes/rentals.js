const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const UserCtrl = require('../controllers/userController');

router.get('/secret', UserCtrl.authMiddleWare, function(req, res) {

    res.json({'secret': true});
});

router.get('', function(req, res) {
    Rental.find({}, function(err, foundRentals) {
        return res.json(foundRentals);
    });
});

router.get('/:id', function(req, res) {
    
    const rentalId = req.params.id;

    Rental.findById(rentalId, function(err, foundRental) {

        if (err) {
            return res.status(422).send({ errors: [{ title: 'Rental Error', detail: 'Could not find rental'}]});
        }

        return res.json(foundRental);
    });
});

module.exports = router;