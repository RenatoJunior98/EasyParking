var express = require('express');
var router = express.Router();
var reviewModel = require("../models/reviewModel");


/* add review */
router.post('/', async function(req, res, next) {
    let review = req.body;
    let result = await reviewModel.save(review);
    res.status(result.status).send(result.data);
  });
  
  
  module.exports = router;