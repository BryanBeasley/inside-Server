const { DataTypes } = require("sequelize");
const database = require("../db");

module.exports = database.define("note", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    noteId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});