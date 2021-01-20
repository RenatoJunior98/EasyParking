  
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


  /* GET parque */

// router.get('/:id', async function(req, res, next) {
//   let idParque = req.params.id;
//   let result = await albModel.getOne(idParque);
//   res.status(result.status).
//      send(result.data);
// });





module.exports = router