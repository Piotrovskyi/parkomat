const Sequelize = require('sequelize');
const dbInstance = require('./db-instance');

const Deposit = dbInstance.define('deposit', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true
  },
  userId: Sequelize.INTEGER,
  amount: Sequelize.INTEGER,
  createdAt: Sequelize.INTEGER
});

module.exports = Deposit;
