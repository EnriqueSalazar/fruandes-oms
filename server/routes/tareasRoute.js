/**
 * Created by enriq on 10/06/16.
 */
const models = require('../models');
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

router.post('/areas/findall', jsonParser, (req, res) => {
  models.areas.hasMany(models.metas, {foreignKey: 'area_id'});
  models.metas.belongsTo(models.areas, {foreignKey: 'area_id'});

  models.metas.hasMany(models.tareasAreas, {foreignKey: 'meta_id'});
  models.tareasAreas.belongsTo(models.metas, {foreignKey: 'meta_id'});

  models.tareasAreas.findAll({
    include: [{
      model: models.metas,
      attributes: ['id', 'nombre_meta'],
      include: [{
        model: models.areas,
        attributes: ['id', 'nombre_area', 'type'],
      }]
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

router.post('/area/findall', jsonParser, (req, res) => {
  const id = req.body.id;

  models.areas.hasMany(models.metas, {foreignKey: 'area_id'});
  models.metas.belongsTo(models.areas, {foreignKey: 'area_id'});

  models.metas.hasMany(models.tareasAreas, {foreignKey: 'meta_id'});
  models.tareasAreas.belongsTo(models.metas, {foreignKey: 'meta_id'});

  models.tareasAreas.findAll({
    include: [{
      model: models.metas,
      attributes: ['id', 'nombre_meta'],
      required: true,
      include: [{
        model: models.areas,
        attributes: ['id', 'nombre_area', 'type'],
        where: {id}
      }]
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

router.post('/meta/findall', jsonParser, (req, res) => {
  const payload = req.body;

  models.areas.hasMany(models.metas, {foreignKey: 'area_id'});
  models.metas.belongsTo(models.areas, {foreignKey: 'area_id'});

  models.metas.hasMany(models.tareasAreas, {foreignKey: 'meta_id'});
  models.tareasAreas.belongsTo(models.metas, {foreignKey: 'meta_id'});

  models.tareasAreas.findAll({
    include: [{
      model: models.metas,
      attributes: ['id', 'nombre_meta'],
      where: payload,
      include: [{
        model: models.areas,
        attributes: ['id', 'nombre_area'],
        required: true
      }]
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

router.post('/findone', jsonParser, (req, res) => {
  const payload = req.body;
  models.tareasAreas.findOne({
    where: payload
  }).then((result) => {
    res.send({
      result
    });
  }, (rejectedPromiseError) => {
    res.send(rejectedPromiseError);
    console.error('error message', rejectedPromiseError.message); // eslint-disable-line
  });
});

router.post('/area/create', jsonParser, (req, res) => {
  const payload = req.body;
  models.tareasAreas.create(
    payload
  ).then((result) => {
    res.send({
      result: result.id
    });
  }, (rejectedPromiseError) => {
    res.send(rejectedPromiseError);
    console.error('error message', rejectedPromiseError.message); // eslint-disable-line
  });
});

router.post('/area/update', jsonParser, (req, res) => {
  const id = req.body.id;
  const payload = req.body;
  models.tareasAreas.update(payload, {
    where: {
      id
    }
  }).then((result) => {
    res.send({
      result: result[0]
    });
  }, (rejectedPromiseError) => {
    res.send(rejectedPromiseError);
    console.error('error message', rejectedPromiseError.message); // eslint-disable-line
  });
});

router.post('/area/destroy', jsonParser, (req, res) => {
  const payload = req.body;
  models.tareasAreas.destroy({
    where: payload
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

