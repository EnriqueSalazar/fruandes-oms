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

router.post('/findall', jsonParser, (req, res) => {
  const payload = req.body;
  models.comentariosAreas.findAll(
    {where: payload}
  )
    .then((result) => {
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
  models.comentariosAreas.findOne({
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

router.post('/create', jsonParser, (req, res) => {
  const payload = req.body;
  models.comentariosAreas.create(
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

router.post('/update', jsonParser, (req, res) => {
  const id = req.body.id;
  const payload = req.body;
  models.comentariosAreas.update(payload, {
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

router.post('/destroy', jsonParser, (req, res) => {
  const payload = req.body;
  models.comentariosAreas.destroy({
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
