
const Booking = require('../models/booking');
const Rental = require('../models/rental');
const User = require('../models/user');
const Payment = require('../models/payment');
const { normalizeErrors } = require('../helpers/mongoose');
const moment = require('moment');
const config = require('../config/')
const stripe = require('stripe')(config.STRIPE_SK);

exports.createBooking = function(req, res) {

    const { startAt, endAt, totalPrice, guests, days, rental, paymentToken } = req.body;
    const user = res.locals.user;

    const booking = new Booking({
        startAt, endAt, totalPrice, guests, days
    });

    // on ajoute bookings et user aux données retournées
    Rental.findById(rental._id)
        .populate('bookings')
        .populate('user')
        .exec(async function(err, foundRental) {

            if (err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }

            // vérifie si l'user connecté book sur une rental lui appartenant
            if (foundRental.user.id === user.id) {
                return res.status(422).send({ errors: [{ title: 'Invalid user', detail: 'Cannot create booking on your rental !!'}]}); 
            }

            // validation du booking
            if (isValidBooking(booking, foundRental)) {

                booking.user = user;
                booking.rental = foundRental;

                const { payment, err } = await createPayment(booking, foundRental.user, paymentToken);

                if (payment) {

                    booking.payment = payment;
                    foundRental.bookings.push(booking);
    
                    booking.save(function(err) {
    
                        if (err) {
                            return res.status(422).send({errors: normalizeErrors(err.errors)});
                        }
    
                        foundRental.save();
    
                        // on ne peut pas sauver directement l'user car le pre.save va rehasher le pass
                        // => on update
                        User.update(
                            {_id: user.id},
                            { $push: { bookings: booking } },
                            function() {}
                        );
    
                        return res.json({startAt: booking.startAt, endAt: booking.endAt});
                    });

                } else {

                    return res.status(422).send({ errors: [{ title: 'Payment Error', detail: err }]}); 
                }
       

            } else {
                return res.status(422).send({ errors: [{ title: 'Invalid booking', detail: 'Choosen date are already taken !!'}]}); 
            }

            //return res.json({booking, foundRental});
    });

}

exports.getUserBookings = function(req, res) {

    const user = res.locals.user;

    Booking.where({user})
           .populate('rental')
           .exec(function(err, foundBookings) {

        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        return res.json(foundBookings);

    });
};

function isValidBooking(proposedBooking, rental) {

    let isValid = true;

    if (rental.bookings && rental.bookings.length > 0) {

        isValid = rental.bookings.every(function(booking) {

            const proposedStart = moment(proposedBooking.startAt);
            const poroposedEnd = moment(proposedBooking.endAt);

            const actualStart = moment(booking.startAt);
            const actualdEnd = moment(booking.endAt);

            return ((actualStart < proposedStart && actualdEnd < proposedStart) || 
                    (poroposedEnd < actualdEnd && poroposedEnd < actualStart)) 
        });
    }    

    return isValid;
}

async function createPayment(booking, toUser, token) {

    const { user } = booking;

    const customer = await stripe.customers.create({
        source: token.id,
        email: user.email,
    });

    if (customer) {

        User.update({_id: user.id}, { $set: { stripeCustomerId: customer.id}}, () => {});

        const payment = new Payment({
            fromUser: user,
            toUser,
            fromStripeCustomerId: customer.id,
            booking,
            tokenId: token.id,
            amount: booking.totalPrice * 100 * 0.8
        });

        try {

            const savePayment = await payment.save();
            return {payment: savePayment};

        } catch (err) {
            return {err: err.message};
        }

    } else {
        return {
            err: 'Cannot process Payement'
        }
    }
}