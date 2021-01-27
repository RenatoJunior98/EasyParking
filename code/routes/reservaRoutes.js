var express = require('express');
var router = express.Router();
var reservaModel = require("../models/reservaModel");


/* check codigo */
router.get('/:codigo', async function (req, res, next) {
  let codigo = req.params.codigo;
  let result = await reservaModel.verificarcodigo(codigo);
  res.status(result.status).
    send(result.data);
});

/* GET reservas */
router.get('/reservas/:userID', async function(req, res, next) {
  let userID = req.params.userID;
  let result = await reservaModel.getReservas(userID);
  res.status(result.status).
     send(result.data);
});

/* GET parqueID from reservas */
router.get('/', async function(req, res, next) {
  let result = await reservaModel.getParqueIDReservasDia();
  res.status(result.status).
     send(result.data);
});

/* add reserva */
router.post('/', async function(req, res, next) {
  let reserva = req.body;
  let result = await reservaModel.newReserva(reserva);
  res.status(result.status).send(result.data);
});


/* Mudar estado da reserva */
router.post('/:reservaID/:estadoID', async function(req, res, next) {
  let reservaID = req.params.reservaID;
  let estadoID = req.params.estadoID;
  let result = await reservaModel.mudarEstado(estadoID, reservaID);
  res.status(result.status).send(result.data);
});

/* Mudar estado da reserva após utilização*/
router.post('/:codigo', async function(req, res, next) {
  let codigo = "";
  codigo = req.params.codigo;
  let result = await reservaModel.usarReserva(codigo);
  res.status(result.status).send(result.data);
});

module.exports = router;