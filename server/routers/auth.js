const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const { getUserLogin } = require("../db/queries");

require('dotenv').config();

router.post("/login", async (req, res, next) => {
  const { username, email, password } = req.body

  await getUserLogin({ username, email, password })
    .then(result => {
      console.log('getUserLogin result:', result);

      if(result.error) {
        res.status(401).send({
          status: 401,
          message: "Incorrect username and/or email, please try again"
        })
      }

      bcrypt
        .compare(password, result.password)
        .then(result => {
          if (result = true) {

            res.status(201)
              .send({
                status: 201,
                message: "Correct password used"
              })
          } else {
            res.status(401).send({
              status: 401,
              message: "Incorrect password used, please try again"
            })
          }
        })
        .catch(console.log)   
    })
    .catch(console.log)
})

module.exports = router;