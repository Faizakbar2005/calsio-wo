const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  height: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  equipment: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bmi: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  daily_target_calories: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 500
  }
}, {
  tableName: 'users'
});

module.exports = User;