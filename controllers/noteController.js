const router = require("express").Router();
const Note = require("../models/note");
const validateSession = require("../middleware/validate");

router.get("/test", (req, res) => res.send("Note Test!"));

// CREATE NEW Note
router.post("/create", (req, res) => {
    Note.create({
        userId: req.user.id,
        noteId: req.body.noteId,
        title: req.body.title,
        text: req.body.text,
    })

    .then((note) =>
            res.status(200).json({
                message: "note created successfully",
                note: note,
            })
        )
        .catch((err) =>
            res.status(500).json({ message: "Note creation Failed", error: err })
        );
});

//Get all Note

router.get("/collection", (req, res) => {
    Note.findAll()
        .then((noteCollection) =>
            res.status(200).json({
                message: ` ${noteCollection.length} notes to collect!`,
                count: noteCollection.length,
                noteCollection,
            })
        )
        .catch((err) =>
            res.status(500).json({ message: "grab collection of notes Failed", err })
        );
});

// UPDATE A Note

router.put("/noteUpdate/:id", validateSession, (req, res) => {
    Note.update(req.body, { where: { id: req.params.id, userId: req.user.id } })
        .then((updated) =>
            res.status(200).json({
                message: `Successfully updated Note! 
        ${req.params.id}`,
                updated,
            })
        )
        .catch((err) =>
            res.status(500).json({ message: "Update note failed!", err })
        );
});

//DELETE A Note
router.delete("/noteBurn/:id", validateSession, (req, res) => {
    Note.destroy({ where: { id: req.params.id } })
        .then((burned) =>
            res.status(200).json({
                message: `The Note has been destroyed! #${req.params.id}`,
                burned,
            })
        )
        .catch((err) =>
            res.status(500).json({ message: "Note deletion failed!", error: err })
        );
});

module.exports = router;