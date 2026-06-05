const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type         : DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey   : true
  },
  name: {
    type     : DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type     : DataTypes.STRING,
    allowNull: true,
    unique   : true,
  },
  password: {
    type     : DataTypes.STRING,
    allowNull: true,
  },
  age: {
    type     : DataTypes.INTEGER,
    allowNull: true,
  },
  weight: {
    type     : DataTypes.FLOAT,
    allowNull: true,
  },
  height: {
    type     : DataTypes.FLOAT,
    allowNull: true,
  },
  gender: {
    type     : DataTypes.STRING,
    allowNull: true,
  },
  equipment: {
    type     : DataTypes.STRING,
    allowNull: true,
  },
  bmi: {
    type     : DataTypes.FLOAT,
    allowNull: true,
  },
  daily_target_calories: {
    type        : DataTypes.INTEGER,
    allowNull   : true,
    defaultValue: 500,
  },
  // ✅ TAMBAH INI
  experience_level: {
    type        : DataTypes.INTEGER,
    allowNull   : true,
    defaultValue: 1,
  },
  workout_frequency: {
    type        : DataTypes.INTEGER,
    allowNull   : true,
    defaultValue: 3,
  },
}, {
  tableName : 'users',
  timestamps: false,
})

module.exports = User