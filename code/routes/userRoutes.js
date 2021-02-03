var express = require('express');
var router = express.Router();
var userModel = require("../models/userModel");


/* login */
router.get('/LoginDados/:username/:password', async function (req, res, next) {
 let username = req.params.username;
  let pass = req.params.password;
  let result = await userModel.login(username, pass);
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