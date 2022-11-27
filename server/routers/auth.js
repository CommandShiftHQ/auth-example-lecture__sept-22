const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserLogin } = require("../db/queries");

require('dotenv').config();
const jwtSecret = process.env.jwtSecret;

router.post("/login", async (req, res, next) => {
    const { username, email, password } = req.body

    getUserLogin({ username, email })
        .then(result => {
            console.log('getUserLogin result:', result);

            if (result.error) {
                res.status(401).send({
                    status: 401,
                    message: "incorrect username and/or email used, please try again"
                })
            }

            bcrypt
                .compare(password, result.password)
                .then(result => {
                    if (result === true) {
                        const token = jwt.sign({ email, password }, jwtSecret);
                        res
                            .status(201)
                            .cookie('userToken', token, { maxAge: 1000 * 60 * 60 * 24 })
                            .send({
                                status: 201,
                                message: "correct password used, cookie created"
                            })
                    } else {
                        res.status(401).send({
                            status: 401,
                            message: "incorrect password used, please try again"
                        })
                    }
                })
                .catch(console.log)
        })
        .catch(console.log)
})

module.exports = router;