const Sequelize = require('sequelize');
const dbInstance = require('./db-instance');


module.exports = dbInstance.define('car', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  userId: Sequelize.INTEGER,
  number: Sequelize.STRING,
  info: Sequelize.STRING
});
