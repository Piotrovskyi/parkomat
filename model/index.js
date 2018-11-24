require('./associations');
const User = require('./user');
const Parking = require('./parking');
const Car = require('./car');
const Session = require('./session');
const Deposit = require('./deposit');
const Payment = require('./payment');

module.exports = {
  User,
  Parking,
  Car,
  Session,
  Deposit,
  Payment
};
