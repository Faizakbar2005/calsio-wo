const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// models/Favorite.js
const Favorite = sequelize.define('Favorite', {
  exercise_name: {
    type     : DataTypes.STRING,
    allowNull: false,
  },
UserId: {
  type      : DataTypes.INTEGER,
  allowNull : true,  // ← ubah jadi true
  references: { model: 'users', key: 'id' },
},
}, {
  tableName : 'favorites',
  timestamps: true,
  createdAt : 'created_at',
  updatedAt : false,
  indexes   : [{ unique: true, fields: ['exercise_name', 'UserId'] }], // unik per user
})

module.exports = Favorite 