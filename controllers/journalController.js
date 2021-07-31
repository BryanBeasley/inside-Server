const router = require("express").Router();
const Journal = require("../models/journal");
const validateSession = require("../middleware/validate");

router.get("/test", (req, res) => res.send("Journal Test!"));

// CREATE NEW Journal
router.post("/create", validateSession, (req, res) => {
    Journal.create({
        user_id: req.user.id,
        journalId: req.body.journalId,
        bookName: req.body.bookName,
        chapterName: req.body.chapterName,
    })

    .then((journal) =>
            res.status(200).json({
                message: "JournalBook created successfully",
                journal: journal,
            })
        )
        .catch((err) =>
            res.status(500).json({ message: "Journal creation Failed", error: err })
        );
});

//Get all Journals

router.get("/collection", (req, res) => {
    Journal.findAll({ where: { user_id: req.user.id } })
        .then((journalCollection) =>
            res.status(200).json({
                message: ` ${journalCollection.length} Journals total!`,
                count: journalCollection.length,
                journalCollection,
            })
        )
        .catch((err) =>
            res.status(500).json({ message: "collection of journals Failed", err })
        );
});

// UPDATE A journal

router.put("/journalUpdate/:id", validateSession, (req, res) => {
    Journal.update(req.body, { where: { id: req.params.id } })
        .then((updated) =>
            res.status(200).json({
                message: `Successfully updated Journal! 
        ${req.params.id}`,
                updated,
            })
        )
        .catch((err) =>
            res.status(500).json({ message: "Update journal failed!", err })
        );
});

//DELETE A Journal Book
router.delete("/journalBurn/:id", validateSession, (req, res) => {
    Journal.destroy({ where: { id: req.params.id } })
        .then((burned) =>
            res.status(200).json({
                message: `The Journal has been destroyed! #${req.params.id}`,
                burned,
            })
        )
        .catch((err) =>
            res.status(500).json({ message: "Journal deletion failed!", error: err })
        );
});

module.exports = router;