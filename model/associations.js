const User = require('./user');
const Parking = require('./parking');
const Car = require('./car');
const Session = require('./session');

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


//{include: [{model: Session, as: 'sessions'}]}
