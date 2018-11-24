const Sequelize = require('sequelize');
const dbInstance = require('./db-instance');

const Session = dbInstance.define('session', {
    id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  carId: Sequelize.INTEGER,
  parkingId: Sequelize.INTEGER,
  openedAt: Sequelize.INTEGER,
  closedAt: Sequelize.INTEGER,
  cost: Sequelize.INTEGER,
  paid: {
    type: Sequelize.INTEGER,
    get() {
      return !!this.getDataValue('paid');
    },
  }
});

module.exports = Session;
