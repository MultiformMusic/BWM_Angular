const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const FakeDb = require('./fake-db');
const rentalsRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users');
const bookingRoutes = require('./routes/booking');
const paymentRoutes = require('./routes/payments');

const path = require('path');

mongoose.connect(config.DB_URI, { useNewUrlParser: true })
    .then(() => {

        /** config pour dev **/
        if (process.env.NODE_ENV !== 'production') {
            const fakeDb = new FakeDb();
            //fakeDb.seedDb(); 
        }
    });


const app = express();
app.use(bodyParser.json());
app.use('/api/v1/rentals', rentalsRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/payments', paymentRoutes);

/** config pour prod : servir l'appli depuis dist **/
if (process.env.NODE_ENV === 'production') {
    const appPath = path.join(__dirname, '..', 'dist');
    app.use(express.static(appPath));
    app.get('*', function(req, res) {
        res.sendFile(path.resolve(appPath, 'index.html'));
    });
}


const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
    console.log('Server running');
});