module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    exercise_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'favorites',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  })
  return Favorite
}