const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/CONN');
const Post = require('../models/Post');

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

User.hasMany(Post, {
  foreignKey: 'user_id',
});

module.exports = User;