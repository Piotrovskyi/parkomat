const Sequelize = require('sequelize');
const dbInstance = require('./db-instance');


module.exports = dbInstance.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  email: Sequelize.STRING,
  type: Sequelize.INTEGER,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING
});
