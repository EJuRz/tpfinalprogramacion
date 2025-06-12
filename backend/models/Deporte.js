const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Deporte = sequelize.define('Deporte', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(15),
    allowNull: true
  },
  tipo: {
    type: DataTypes.STRING(15),
    allowNull: true
  },
  cant_jugadores: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  descripcion: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'deportes',
  timestamps: false
});

module.exports = Deporte;