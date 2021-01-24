var express = require('express');
var router = express.Router();
var reservaModel = require("../models/reservaModel");


/* add reserva */
router.post('/', async function(req, res, next) {
    let reserva = req.body;
    let result = await reservaModel.newReserva(reserva);
    res.status(result.status).send(result.data);
  });
  

/* check codigo */
router.get('/:codigo', async function (req, res, next) {
  let codigo = req.params.codigo;
  let result = await reservaModel.checkCodigo(codigo);
  res.status(result.status).
    send(result.data);
});

module.exports = router;