
const Rental = require('./models/rental');
const User = require('./models/user');
const Booking = require('./models/booking');
const fakeDbDatas = require('./data.json');

class FakeDb {

    constructor() {
        
        this.rentals = fakeDbDatas.rentals;
        this.users = fakeDbDatas.users;
    }

    async cleanDb() {
        await User.remove({});
        await Rental.remove({});
        await Booking.remove({});
    }

    pushDatasToDb() {

        const user = new User(this.users[0]);
        const user2 = new User(this.users[1]);

        this.rentals.forEach((rental) => {
            const newRental = new Rental(rental);
            newRental.user = user;

            user.rentals.push(newRental);

            newRental.save();
        });

        user.save();
        user2.save();
    }

    async seedDb() {
        await this.cleanDb();
        this.pushDatasToDb();
    }
}

module.exports = FakeDb;