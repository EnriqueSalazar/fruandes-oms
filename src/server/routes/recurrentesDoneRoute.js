/**
 * Created by enriq on 10/06/16.
 */
const models = require('../models/index');
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router();
const nodemailer = require('nodemailer');

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
    sendMail(payload);
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

let sendMail = (payload) => {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'servidor@fruandes.co', // Your email id
      pass: '830104198-8' // Your password
    }
  });
  // console.info('payload', payload);
let type='';
  let area_id='';
  let meta_id='';
  let tarea_id='';
  let urlText='';
  if (payload){
    tarea_id=payload.id;
    if (payload.metas_table){
      meta_id=payload.metas_table.id
      if (payload.metas_table.areas_table){
       area_id=payload.metas_table.areas_table.id;
        type=payload.metas_table.areas_table.type;
        urlText='Para ver si contenido haga clic <a href="oms.fruandes.com/taskspage/'+type+'/'+area_id+'/'+meta_id+'/'+tarea_id+'">aqui.</a>'
      }
    }
  }
  models.usuarios.findOne({
    attributes: {exclude: ['pwd']},
    where: {id: payload.id_responsable_tarea}
  }).then((result) => {
    // console.info('result', result);
    let mailOptions = {
      from: 'servidor@fruandes.co',
      to: result.email_usuario,
      subject: '[FRUANDES] '+ payload.nombre_tarea,
      // text: JSON.stringify(payload)
      html: 'La tarea <strong>'+payload.nombre_tarea+'</strong> se ha actualizado.<br />'+urlText
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error(error);
      } else {
        console.info('Message sent: ' + info.response);
      }
    });
  }, (rejectedPromiseError) => {
    console.error('error message', rejectedPromiseError.message); // eslint-disable-line
  });


}

module.exports = router;

