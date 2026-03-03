const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const History = sequelize.define('History', {
  calories: DataTypes.FLOAT,
  duration: DataTypes.INTEGER
}, {
  tableName: 'histories'
});

module.exports = History;