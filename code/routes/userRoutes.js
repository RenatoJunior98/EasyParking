var express = require('express');
var router = express.Router();
var userModel = require("../models/userModel");


/* login */
router.get('/:username/:pass', async function(req, res, next) {
    let username = req.params.username;
    let pass = req.params.pass;
    let result = await userModel.verificarLogin(username, pass);
    res.status(result.status).
       send(result.data);
  });

  
/* check username */
router.get('/:username', async function(req, res, next) {
    let username = req.params.username;
    let result = await userModel.verificarUsername(username);
    res.status(result.status).
       send(result.data);
  });


  /* add user */
router.post('/', async function(req, res, next) {
    let user = req.body;
    let result = await userModel.newUser(user);
    res.status(result.status).send(result.data);
  });

  module.exports = router;