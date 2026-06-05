const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Workout = sequelize.define('Workout', {
  id: {
    type         : DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey   : true
  },
  muscle_group: {
    type     : DataTypes.STRING,
    allowNull: false
  },
  sets        : DataTypes.INTEGER,
  reps        : DataTypes.INTEGER,
  rest_minutes: DataTypes.INTEGER,
  UserId: {
    type     : DataTypes.INTEGER,   // ← sama dengan users.id
    allowNull: true
  }
}, {
  tableName: 'workouts'
});

module.exports = Workout;