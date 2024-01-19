const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/CONN');

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,

        },

        body: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post', 
    }
);