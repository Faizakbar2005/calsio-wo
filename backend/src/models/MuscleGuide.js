const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const MuscleGuide = sequelize.define('MuscleGuide', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT,
  equipment_type: DataTypes.STRING
}, {
  tableName: 'muscle_guides'
});

module.exports = MuscleGuide;