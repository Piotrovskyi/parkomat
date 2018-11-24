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
  status: {
    type: Sequelize.INTEGER,
    get() {
      return !!this.getDataValue('status');
    },
  },
  amount: Sequelize.INTEGER,
  createdAt: Sequelize.INTEGER
});

module.exports = Deposit;
