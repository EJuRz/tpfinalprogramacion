const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tpfinal', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;