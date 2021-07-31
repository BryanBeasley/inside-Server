const router = require("express").Router();
const Habits = require("../models/habits");
const validateSession = require("../middleware/validate");

router.get("/test", (req, res) => res.send("Habits"));

// CREATE NEW Habit

router.post("/create", (req, res) => {
    Habits.create({
            habitId: req.body.habitId,
            title: req.body.title,
            completed: req.body.completed,
        })
        .then((habit) =>
            res.status(200).json({ message: "Habit Create", habit: habit })
        )
        .catch((err) =>
            res.status(500).json({ message: "Habit creation Failed", error: err })
        );
});

// CREATE Habit CREW

router.get("/allHabits", (req, res) => {
    Habits.findAll()
        .then((habits) =>
            res.status(200).json({
                message: ` ${habits.length} habits!`,
                count: habits.length,
                habits,
            })
        )
        .catch((err) => res.status(500).json({ message: "No habits found", err }));
});

// UPDATE A Habit

router.put("habitUpdate/:id", validateSession, (req, res) => {
    Habits.update(req.body, { where: { id: req.params.id } })
        .then((updated) =>
            res.status(200).json({
                message: `Successfully updated Habit ${req.params.id}`,
                updated,
            })
        )
        .catch((err) =>
            res.status(500).json({ message: "Not able to update habit", err })
        );
});

//DELETE A Habit (walk the plank)

router.delete("/habitDelete/:id", validateSession, (req, res) => {
    Habits.destroy({ where: { id: req.params.id } })
        .then((habitDelete) =>
            res
            .status(200)
            .json({ message: `Habit Deleted! #${req.params.id}`, habitDelete })
        )
        .catch((err) =>
            res.status(500).json({ message: "Unable to delete habit", error: err })
        );
});

module.exports = router;