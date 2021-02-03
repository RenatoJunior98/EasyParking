var express = require('express');
var router = express.Router();
var reviewModel = require("../models/reviewModel");


/* add review */
router.post('/', async function(req, res, next) {
    let review = req.body;
    console.log("Model: " + JSON.stringify(review));
    let result = await reviewModel.newReview(review);
    res.status(result.status).send(result.data);
  });


  /* GET reviews */
router.get('/reviewsParque/:parqueID', async function(req, res, next) {
  let idObj = req.params.parqueID;
  let result = await reviewModel.getReviews(idObj);
  res.status(result.status).
     send(result.data);
});
  module.exports = router;