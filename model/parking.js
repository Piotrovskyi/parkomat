const Sequelize = require('sequelize');
const dbInstance = require('./db-instance');

const Parking = dbInstance.define('parking', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true
  },
  userId: Sequelize.INTEGER,
  title: Sequelize.STRING,
  latitude: Sequelize.STRING,
  longitude: Sequelize.STRING,
  places: Sequelize.INTEGER,
  price: Sequelize.INTEGER,
  description: Sequelize.STRING
});

module.exports = Parking;
