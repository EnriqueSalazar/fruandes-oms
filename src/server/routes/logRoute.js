/**
 * Created by enriq on 10/06/16.
 */
const models = require('../models/index');
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router();


router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.post('/findall', jsonParser, (req, res) => {
  models.usuarios.hasMany(models.log, {foreignKey: 'usuario_id'});
  models.log.belongsTo(models.usuarios, {foreignKey: 'usuario_id'});

  models.metas.hasMany(models.tareasAreas, {foreignKey: 'meta_id'});
  models.tareasAreas.belongsTo(models.metas, {foreignKey: 'meta_id'});

  models.log.findAll({
    include: [{
      model: models.usuarios,
      attributes: ['id', 'nombre_usuario']
    }]
  }).then((result) => {
    res.send({
      result
    });
  }, (rejectedPromiseError) => {
    res.send(rejectedPromiseError);
    console.error('error message', rejectedPromiseError.message); // eslint-disable-line
  });
});


module.exports = router;

