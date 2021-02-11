var express = require('express');
var router = express.Router();
var reservaModel = require("../models/reservaModel");

/* GET reservas */
router.get('/reservasUser/', async function(req, res, next) {
  let userObj = req.query;
  let result = await reservaModel.getReservas(userObj);
  res.status(result.status).
     send(result.data);
});

/* GET notificacoes */
router.get('/reservasNotificacoes/', async function(req, res, next) {
  let userObj = req.query;
  let result = await reservaModel.getNotificacoes(userObj);
  res.status(result.status).
     send(result.data);
});


/* add reserva */
router.post('/newBooking', async function(req, res, next) {
  let reserva = req.body;
  let result = await reservaModel.newReserva(reserva);
  res.status(result.status).send(result.data);
});


/* Verificar reservas não utilizadas ou em espera */
router.put('/newState', async function(req, res, next) {
  let result = await reservaModel.VerificarReservas();
  res.status(result.status).send(result.data);
});

/* Verifica codigo e muda estado da reserva após utilização*/
router.put('/use/', async function(req, res, next) {
  let codigo = req.body;
  let result = await reservaModel.usarReserva(codigo);
  res.status(result.status).send(result.msg);
});


/* Mudar IsNotificado */
router.put('/updateNotificacao/:reservaID', async function(req, res, next) {
  let reservaID = req.params.reservaID;
  let result = await reservaModel.notificacaoVista(reservaID);
  res.status(result.status).send(result.data);
});


module.exports = router;