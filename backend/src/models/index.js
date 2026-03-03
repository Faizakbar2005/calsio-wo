const { sequelize } = require('../config/database');
const User = require('./User');
const Workout = require('./Workout');
const History = require('./History');

User.hasMany(History);
History.belongsTo(User);

User.hasMany(Workout);
Workout.belongsTo(User);

module.exports = {
  sequelize,
  User,
  Workout,
  History
};