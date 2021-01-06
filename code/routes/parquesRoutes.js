  
var express = require('express');
var router = express.Router();
var parkModel = require("../models/parquesModel");

/* GET all parques */
router.get('/', async function(req, res, next) {
    let result = await parkModel.getAll(filterObj);
    res.status(result.status).
       send(result.data);
  });


/* GET reviews */
router.get('/:id', async function(req, res, next) {
  let id = req.params.id;
  let result = await parkModel.getReviews(id);
  res.status(result.status).
     send(result.data);
});

/* login */
router.get('/:username/:pass', async function(req, res, next) {
  let username = req.params.username;
  let pass = req.params.pass;
  let result = await parkModel.verificarLogin(username, pass);
  res.status(result.status).
     send(result.data);
});


module.exports = router;