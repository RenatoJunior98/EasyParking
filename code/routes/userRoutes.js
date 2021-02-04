var express = require('express');
var router = express.Router();
var userModel = require("../models/userModel");


/* login */
router.get('/LoginDados/', async function (req, res, next) {
 let user = req.query;
 console.log("model" + JSON.stringify(user));
  let result = await userModel.login(user);
  res.status(result.status).
    send(result.data);
});



/* add user */
router.post('/newUSer', async function (req, res, next) {
  let user = req.body;
  let result = await userModel.newUser(user);
  res.status(result.status).
    send(result.data);
});

module.exports = router;