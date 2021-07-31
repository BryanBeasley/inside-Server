const { DataTypes } = require("sequelize");
const database = require("../db");

module.exports = database.define("habits", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    habitId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
});