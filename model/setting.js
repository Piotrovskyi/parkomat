const Sequelize = require('sequelize');
const dbInstance = require('./db-instance');

const Session = dbInstance.define('setting', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: Sequelize.STRING,
  value: Sequelize.STRING
});

module.exports = Session;
