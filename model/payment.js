const Sequelize = require('sequelize');
const dbInstance = require('./db-instance');

const Payment = dbInstance.define('payment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true
  },
  userId: Sequelize.INTEGER,
  carId: Sequelize.INTEGER,
  parkingId: Sequelize.INTEGER,
  amount: Sequelize.INTEGER,
  createdAt: Sequelize.INTEGER
});

module.exports = Payment;
