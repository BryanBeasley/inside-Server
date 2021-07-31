const { DataTypes } = require("sequelize");
const database = require("../db");

module.exports = database.define("journal", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    journalId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    bookName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    chapterName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});