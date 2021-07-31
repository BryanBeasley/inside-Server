const User = require("./user");
const Journal = require("./journal");
const Note = require("./Note");
const Habits = require("./habits");

User.hasMany(Journal);
Journal.belongsTo(User);

User.hasMany(Note);
Note.belongsTo(User);

User.hasMany(Habits);
Habits.belongsTo(User);

module.exports = {
    User,
    Journal,
    Note,
    Habits,
};