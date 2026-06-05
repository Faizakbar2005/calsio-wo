const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const History = sequelize.define('History', {
  id: {
    type         : DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey   : true
  },
  calories: DataTypes.FLOAT,
  duration: DataTypes.INTEGER,
  exercise_name: {
    type     : DataTypes.STRING,
    allowNull: true
  },
  muscle_group: {
    type     : DataTypes.STRING,
    allowNull: true
  },
  workout_type: {
    type     : DataTypes.STRING,
    allowNull: true
  },
  UserId: {
    type     : DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'histories'
});

module.exports = History;