  
var express = require('express');
var router = express.Router();
var parkModel = require("../models/parquesModel");

/* GET all parques */
router.get('/', async function(req, res, next) {
  let filterObj = req.query;  
  let result = await parkModel.getAll(filterObj);
    res.status(result.status).
       send(result.data);
  });


/* GET lugares disponiveis */
router.get('/:id', async function(req, res, next) {
  let id = req.params.id;
  let result = await parkModel.getLugaresDisponiveis(id);
  res.status(result.status).
     send(result.data);
});

/* Mudar lugares disoponiveis */
router.post('/lugares/:lugares/:parqueID', async function(req, res, next) {
  let lugares = req.params.lugares;
  let parqueID = req.params.parqueID;
  let result = await parkModel.mudaLugares(lugares, parqueID);
  res.status(result.status).send(result.data);
});


/* check codigo */
// router.get('/:codigo', async function (req, res, next) {
//   let codigo = req.params.codigo;
//   let result = await userModel.verificarcodigo(codigo);
//   res.status(result.status).
//     send(result.data);
// });



module.exports = router