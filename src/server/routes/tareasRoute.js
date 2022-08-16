<<<<<<< HEAD
 /*


 
=======
/**
>>>>>>> 5431cd70ffe1299da22486f46fe6d038724b7ffc
 * Created by enriq on 10/06/16.
 */
const models = require('../models/index');
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const moment = require('moment');

const jsonParser = bodyParser.json();
const router = express.Router();

router.use((req, res, next) => {
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
};

router.post('/areas/findall', jsonParser, (req, res) => {
  models.areas.hasMany(models.metas, {foreignKey: 'area_id'});
  models.metas.belongsTo(models.areas, {foreignKey: 'area_id'});

  models.metas.hasMany(models.tareasAreas, {foreignKey: 'meta_id'});
  models.tareasAreas.belongsTo(models.metas, {foreignKey: 'meta_id'});

  models.tareasAreas.hasMany(models.recurrentesDone, {foreignKey: 'recurrente_id'});
  models.recurrentesDone.belongsTo(models.tareasAreas, {foreignKey: 'recurrente_id'});

  models.usuarios.hasMany(models.recurrentesDone, {foreignKey: 'usuario_id'});
  models.recurrentesDone.belongsTo(models.usuarios, {foreignKey: 'usuario_id'});

  models.tareasAreas.findAll({
    include: [{
      model: models.metas,
      attributes: ['id', 'nombre_meta'],
      include: [{
        model: models.areas,
        attributes: ['id', 'nombre_area', 'type'],
      }]
    }, {
      model: models.recurrentesDone,
      attributes: ['id', 'createdAt'],
      include: [{
        model: models.usuarios,
        attributes: ['nombre_usuario'],
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
  writeLog("Crear Tarea", req.body, req.query.usuario_id);
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
  let updateTarea = () => {
    models.tareasAreas.update(payload, {
      where: {
        id
      }
    }).then((result) => {
      res.send({
        result: result[0]
      });
      sendMailTarea(payload, oldTarea);
    }, (rejectedPromiseError) => {
      res.send(rejectedPromiseError);
      console.error('error message', rejectedPromiseError.message); // eslint-disable-line
    });
  };
  let calculateDeadline = (startAt, deadline_tarea) => {
    let newDeadline = moment(startAt);
    let prevDeadline = deadline_tarea ? moment(deadline_tarea) : moment(startAt);
    switch (parseInt(payload.periodo)) {
      case 7:
        if (moment().isBefore(prevDeadline)) {
          (newDeadline = prevDeadline.clone().add(7, 'days'));
        }
        while (newDeadline.isBefore(moment())) {
          newDeadline.add(7, 'days');
        }
        break;
      case 30:
        if (moment().isBefore(prevDeadline)) {
          (newDeadline = prevDeadline.clone().add(1, 'months'));
        }
        while (newDeadline.isBefore(moment())) {
          newDeadline.add(1, 'months');
        }
        break;
      case 90:
        if (moment().isBefore(prevDeadline)) {
          (newDeadline = prevDeadline.clone().add(3, 'months'));
        }
        while (newDeadline.isBefore(moment())) {
          newDeadline.add(3, 'months');
        }
        break;
      case 180:
        if (moment().isBefore(prevDeadline)) {
          (newDeadline = prevDeadline.clone().add(6, 'months'));
        }
        while (newDeadline.isBefore(moment())) {
          newDeadline.add(6, 'months');
        }
        break;
    }
    return newDeadline;
  };
  let createRecurrentesDone = () => {
    models.recurrentesDone.create({
      recurrente_id: payload.id,
      usuario_id: payload.id_responsable_tarea
    }).then(()=> {
      payload.estado_tarea = false;
      payload.deadline_tarea = calculateDeadline(payload.startAt, payload.deadline_tarea);
      updateTarea();
    }, (rejectedPromiseError) => {
      res.send(rejectedPromiseError);
      console.error('error message', rejectedPromiseError.message); // eslint-disable-line
    });
  };

  writeLog("Actualizar Tarea", req.body, req.query.usuario_id);
  const id = req.body.id;
  const payload = req.body;
  let oldTarea = {};

  console.error('Update Payload: ' + JSON.stringify(payload, null, 3)); // eslint-disable-line

  models.tareasAreas.findOne({
    where: {id: payload.id}
  }).then((result) => {
    oldTarea = result.dataValues;
    let isRecurrente = payload.is_recurrente;
    let wasRecurrente = oldTarea.is_recurrente;
    let isNewRecurrente = isRecurrente && !wasRecurrente;
    let isStopRecurrente = !isRecurrente && wasRecurrente;
    let isRecurrenteChanged = wasRecurrente != isRecurrente;
    let isPeriodoChanged = oldTarea.periodo != payload.periodo;
    let isStartAtChanged = !moment(oldTarea.startAt).isSame(payload.startAt);
    if (isRecurrenteChanged) {
      console.error('isRecurrenteChanged', isRecurrenteChanged);
      payload.deadline_tarea = null;
    }
    if (isStopRecurrente) {
      console.error('isStopRecurrente', isStopRecurrente);
      payload.startAt = null;
      payload.periodo = null;
    }
    if (isRecurrente && (isNewRecurrente || isPeriodoChanged || isStartAtChanged)) {
      console.error('isNewRecurrente', isNewRecurrente);
      console.error('isPeriodoChanged', isPeriodoChanged);
      console.error('isStartAtChanged', isStartAtChanged);
      payload.estado_tarea = false;
      payload.deadline_tarea = calculateDeadline(payload.startAt, null);
      updateTarea();
    } else if (payload.is_recurrente && payload.estado_tarea == true) {
      console.error('payload.is_recurrente && payload.estado_tarea == true', payload.is_recurrente && payload.estado_tarea == true);
      createRecurrentesDone();
    } else {
      console.error('else');
      updateTarea();
    }
  }, (rejectedPromiseError) => {
    console.error('error message', rejectedPromiseError.message); // eslint-disable-line
  });
});

router.post('/area/destroy', jsonParser, (req, res) => {
  writeLog("Eliminar Tarea", req.body, req.query.usuario_id);
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

let sendMailTarea = (payload, oldTarea) => {
  if (payload && payload.is_notificaciones) {
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'servidor@fruandes.co', // Your email id
        pass: '830104198-8' // Your password
      }
    });
    console.info('Payload: ' + JSON.stringify(payload, null, 3)); // eslint-disable-line

    let updateMessage = '';
    updateMessage = (payload.nombre_tarea != oldTarea.nombre_tarea) ? updateMessage + 'Nombre de tarea se ha actualizado<br />' : updateMessage;
    updateMessage = (payload.meta_id != oldTarea.meta_id) ? updateMessage + 'Meta se ha actualizado<br />' : updateMessage;
    updateMessage = (moment(payload.deadline_tarea).isSame(oldTarea.deadline_tarea, 'day')) ? updateMessage : updateMessage + 'Fecha limite se ha actualizado<br />';
    updateMessage = (payload.id_responsable_tarea != oldTarea.id_responsable_tarea) ? updateMessage + 'Responsable se ha actualizado<br />' : updateMessage;
    updateMessage = (payload.estado_tarea != oldTarea.estado_tarea) ? updateMessage + 'El estado de la tarea se ha actualizado<br />' : updateMessage;
    let type = payload.type;
    let area_id = payload.area_id;
    let meta_id = payload.meta_id;
    let tarea_id = payload.id;
    // let area_id = '';
    // let meta_id = '';
    // let tarea_id =  payload.id;
    // if (payload.metas_table) {
    //   meta_id = payload.metas_table.id
    //   if (payload.metas_table.areas_table) {
    //     area_id = payload.metas_table.areas_table.id;
    //     type = payload.metas_table.areas_table.type;
    //     urlText = 'Para ver si contenido haga clic <a href="oms.fruandes.com/taskspage/' + type + '/' + area_id + '/' + meta_id + '/' + tarea_id + '">aqui.</a>'
    //  console.info('urlText', urlText);
    //   }
    // }
    let urlText = 'Para ver si contenido haga clic <a href="oms.fruandes.com/taskspage/' + type + '/' + area_id + '/' + meta_id + '/' + tarea_id + '">aqui.</a>';
    // console.info('urlText', urlText);
    models.usuarios.findOne({
      attributes: {exclude: ['pwd']},
      where: {id: payload.id_responsable_tarea}
    }).then((result) => {
      // console.error('result', result);
      let mailOptions = {
        from: 'servidor@fruandes.co',
        to: result.email_usuario,
        subject: '[FRUANDES] ' + payload.nombre_tarea,
        // text: JSON.stringify(payload)
        html: updateMessage + 'La tarea <strong>' + payload.nombre_tarea + '</strong> se ha actualizado.<br />' + urlText
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error(error);// eslint-disable-line
        } else {
          console.info('Message sent: ' + info.response);// eslint-disable-line
          console.info('Message options: ' + JSON.stringify(mailOptions, null, 3));// eslint-disable-line
        }
      });
    }, (rejectedPromiseError) => {
      console.error('error message', rejectedPromiseError.message); // eslint-disable-line
    });
  } else {
    console.info('Message disabled');// eslint-disable-line
  }
};

module.exports = router;

