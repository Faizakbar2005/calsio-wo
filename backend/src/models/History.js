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
  deleted_by: {
    type      : DataTypes.INTEGER,
    allowNull : true,
    references: { model: 'admins', key: 'id' },
    onDelete  : 'SET NULL',
  }
}, {
  tableName: 'histories'
});

module.exports = History;