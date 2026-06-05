const { sequelize } = require('../config/database');
const User     = require('./User');
const Workout  = require('./Workout');
const History  = require('./History');
const Admin    = require('./Admin');
const Favorite = require('./Favorite');  // ← tambah ini

User.hasMany(History, { foreignKey: 'UserId' });
History.belongsTo(User, { foreignKey: 'UserId' });

User.hasMany(Workout, { foreignKey: 'UserId' });
Workout.belongsTo(User, { foreignKey: 'UserId' });

module.exports = {
  sequelize,
  User,
  Workout,
  History,
  Admin,
  Favorite,  // ← tambah ini
};