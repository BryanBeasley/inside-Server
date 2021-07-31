require("dotenv").config();
const Express = require("express");
const database = require("./db");

const userController = require("./controllers/userController");
const journalController = require("./controllers/journalController");
const noteController = require("./controllers/noteController");
const habitsController = require("./controllers/habitsController");

const app = Express();

require("./models/index");

app.use(require("./middleware/headers"));
app.use(Express.json());

app.use("/user", userController);
app.use("/journal", journalController);
app.use("/notes", noteController);
app.use("/habits", habitsController);

database.sync();

app.listen(process.env.PORT, () =>
    console.log(`[${process.env.PORT}]: listening`)
);