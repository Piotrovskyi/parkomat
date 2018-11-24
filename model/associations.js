const User = require('./user');
const Parking = require('./parking');
const Car = require('./car');
const Session = require('./session');
const Deposit = require('./deposit');
const Payment = require('./payment');

// Parkings to user
User.hasMany(Parking, {
  foreignKey: 'userId',
  as: 'parkings'
});
Parking.belongsTo(User, {
  foreignKey: 'userId'
});

// Cars to user
User.hasMany(Car, {
  foreignKey: 'userId',
  as: 'cars'
});
Car.belongsTo(User, {
  foreignKey: 'userId'
});

// Sessions to parking
Parking.hasMany(Session, {
  foreignKey: 'parkingId',
  as: 'sessions'
});
Session.belongsTo(Parking, {
  foreignKey: 'parkingId'
});

// Sessions to car
Car.hasMany(Session, {
  foreignKey: 'carId'
});
Session.belongsTo(Car, {
  foreignKey: 'carId',
  as: 'car'
});

// Deposits to user
User.hasMany(Deposit, {
  foreignKey: 'userId',
  as: 'deposits'
});
Deposit.belongsTo(User, {
  foreignKey: 'userId'
});

// Payments to user
User.hasMany(Payment, {
  foreignKey: 'userId',
  as: 'payments'
});
Payment.belongsTo(User, {
  foreignKey: 'userId'
});

//{include: [{model: Session, as: 'sessions'}]}
