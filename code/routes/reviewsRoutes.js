var express = require('express');
var router = express.Router();
var reviewModel = require("../models/reviewModel");


/* new review */
router.post('/', async function(req, res, next) {
    let review = req.body.review;
    let result = await reviewModel.newReview(review);
    res.status(result.status).send(result.data);
  });
  
  
  module.exports = router;