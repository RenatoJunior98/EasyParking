var express = require('express');
var router = express.Router();
var reviewModel = require("../models/reviewModel");


/* add review */
router.post('/', async function(req, res, next) {
    let review = req.body;
    let result = await reviewModel.save(review);
    res.status(result.status).send(result.data);
  });
  

  /* GET reviews */
router.get('/:id', async function(req, res, next) {
  let id = req.params.id;
  let result = await reviewModel.getReviews(id);
  res.status(result.status).
     send(result.data);
});
  module.exports = router;