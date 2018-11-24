const Sequelize = require('sequelize');
const dbInstance = require('./db-instance');
const { userTypes } = require('utils/constants');

module.exports = dbInstance.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true
  },
  email: Sequelize.STRING,
  login: Sequelize.STRING,
  password: Sequelize.STRING,
  type: {
    type: Sequelize.INTEGER,
    get() {
      return userTypes[this.getDataValue('type')];
    }
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  authorizationToken: Sequelize.STRING,
  notificationsToken: Sequelize.STRING,
  balance: Sequelize.INTEGER,
});
