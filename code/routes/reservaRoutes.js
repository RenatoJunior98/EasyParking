var express = require('express');
var router = express.Router();
var reservaModel = require("../models/reservaModel");


/* add reserva */
router.post('/', async function(req, res, next) {
    let reserva = req.body;
    let result = await reservaModel.newReserva(reserva);
    res.status(result.status).send(result.data);
  });
  

//   /* GET reviews */
// router.get('/:id', async function(req, res, next) {
//   let id = req.params.id;
//   let result = await reviewModel.getReviews(id);
//   res.status(result.status).
//      send(result.data);
// });
//   module.exports = router;