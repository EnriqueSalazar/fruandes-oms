 /**
* Created by enriq on 10/06/16.
 */
const models = require('../models/index');
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router();

router.use(jsonParser, (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

let writeLog = (task, body, usuario_id) => {
  body = JSON.stringify(body, null, 4);
  models.log.create(
    {
      body,
      task,
      usuario_id
    }
  ).then((result) => {
  }, (rejectedPromiseError) => {
    console.error('error message', rejectedPromiseError.message); // eslint-disable-line
  });
}

router.post('/findall', jsonParser, (req, res) => {
  models.custom.findAll({
    attributes: ['id', 'jsonCustoms', 'type', 'nombre_tipo']
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
  models.custom.findOne({
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
  writeLog("Crear Custom", req.body);
  const payload = req.body;
  models.custom.create(
    payload
  ).then((result) => {
    res.send({
      result: result.null
    });
  }, (rejectedPromiseError) => {
    res.send(rejectedPromiseError);
    console.error('error message', rejectedPromiseError.message); // eslint-disable-line
  });
});

router.post('/update', jsonParser, (req, res) => {
  debugger
  writeLog("Actualizar Custom", req.body);
  const id = req.body.id;
  const payload = req.body;
  models.custom.update(payload, {
    where: {
      id
    }
  }).then((result) => {
    debugger
    res.send({
      result: result[0]
    });
  }, (rejectedPromiseError) => {
    debugger
    res.send(rejectedPromiseError);
    console.error('error message', rejectedPromiseError.message); // eslint-disable-line
  });
});

router.post('/destroy', jsonParser, (req, res) => {
  writeLog("Eliminar Custom", req.body, req.query.usuario_id);
  const payload = req.body;
  models.custom.destroy({
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
// router.get('/findmetas', (req, res) => {
//     models.custom.hasMany(models.metas, { foreignKey: 'custom_id' });
//     models.metas.belongsTo(models.custom, { foreignKey: 'custom_id' });
//     models.metas.findAll({
//         // where: { id: 1 },
//         include: [{
//             model: models.custom,
//             // required: true
//             where: { id: 1 }
//         }]
//     }).then((result) => {
//         res.send({
//             result
//         })
//     }, (rejectedPromiseError) => {
//         res.send(rejectedPromiseError)
//     })
// });

module.exports = router;

