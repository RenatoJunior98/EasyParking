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

/* Mudar estado da reserva */
router.post('/:reservaID/:estadoID', async function(req, res, next) {
  let reservaID = req.params.reservaID;
  let estadoID = req.params.estadoID;
  let result = await reservaModel.mudarEstado(reservaID, estadoID);
  res.status(result.status).send(result.data);
});

/* GET reservas */
router.get('/reservas/:userID', async function(req, res, next) {
  let userID = req.params.userID;
  let result = await reservaModel.getReservas(userID);
  res.status(result.status).
     send(result.data);
});



module.exports = router;