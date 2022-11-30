const express = require("express");
const router = express.Router();
const { getUserLogin } = require("../db/queries");

require('dotenv').config();

router.post("/login", async (req, res, next) => {
  const { username, email, password } = req.body

  await getUserLogin({ username, email, password })
    .then(result => {
      console.log('getUserLogin result:', result);

      if (result === true) {
        res.status(201).send({
          status: 201,
          message: "Login successful"
        })

      } else {
        res.status(401).send({
          status: 401,
          message: "Incorrect credentials used, please try again"
        })
      }      
    })
    .catch(console.log)
})

module.exports = router;