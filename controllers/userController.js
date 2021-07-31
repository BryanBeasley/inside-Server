const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/test", (req, res) => {
    res.send("User endpoint test works!");
});

//create a new user

router.post("/register", (req, res) => {
    console.log(req.body);
    User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            role: req.body.role,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        })
        .then((user) => {
            let token = jwt.sign({ id: user.id }, process.env.SECRET, {
                expiresIn: "1d",
            });
            res.send({
                user: user,
                message: "User Successfully Created!",
                token: token,
            });
        })

    .catch((error) =>
        res.status(500).send({
            message: "user not created",
            error: error.errors[0].message,
        })
    );
});

// User login

router.post("/login", (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
        },
    }).then((user) => {
        if (user) {
            //compare passwords
            bcrypt.compare(req.body.password, user.password, function(err, matches) {
                matches ? generateToken(user) : res.send("Incorrect Password");
            });

            function generateToken(user) {
                //create the token
                let token = jwt.sign({ id: user.id }, process.env.SECRET, {
                    expiresIn: "1d",
                });
                //send the response
                res.send({ user, token });
            }
        } else {
            res.send("No user found in the database :()");
        }
    });
});

module.exports = router;