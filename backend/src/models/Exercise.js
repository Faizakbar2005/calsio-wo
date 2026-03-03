const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Exercise = sequelize.define('Exercise', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nameEn: {
    type: DataTypes.STRING,
    allowNull: true
  },
  muscleGroup: {
    type: DataTypes.ENUM(
      'dada',       // Chest
      'punggung',   // Back
      'kaki',        // Legs
      'bokong',      // Glutes
      'deltoid',     // Shoulders
      'bisep',       // Biceps
      'trisep',      // Triceps
      'perut',       // Abs
      'kardio'       // Cardio
    ),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  equipment: {
    type: DataTypes.ENUM('with_equipment', 'without_equipment', 'both'),
    defaultValue: 'both'
  },
  difficulty: {
    type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
    defaultValue: 'beginner'
  },
  caloriesPerMinute: {
    type: DataTypes.FLOAT,
    defaultValue: 5.0
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  videoUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // Default recommendations
  defaultSets: {
    type: DataTypes.INTEGER,
    defaultValue: 3
  },
  defaultReps: {
    type: DataTypes.INTEGER,
    defaultValue: 12
  },
  defaultRestSeconds: {
    type: DataTypes.INTEGER,
    defaultValue: 60
  }
}, {
  tableName: 'exercises',
  timestamps: true
});

module.exports = Exercise;
