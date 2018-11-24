const Sequelize = require('sequelize');
const dbInstance = require('./db-instance');
const { userTypes } = require('utils/constants');

module.exports = dbInstance.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  email: Sequelize.STRING,
  type: {
    type: Sequelize.INTEGER,
    get() {
      return userTypes[this.getDataValue('type')];
    },
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  balance: Sequelize.INTEGER,
});
