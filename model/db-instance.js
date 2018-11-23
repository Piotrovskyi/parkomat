const Sequelize = require('sequelize');
const { credentials } = require('config');

module.exports = new Sequelize(credentials.db.name, credentials.db.user, credentials.db.password, {
  host: credentials.db.host,
  dialect: 'mysql',
  define: {
    timestamps: false
  }
});
