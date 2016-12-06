/**
 * Created by enriq on 10/06/16.
 */
const models = require('../models/index');
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router();
const nodemailer = require('nodemailer');
const moment = require('moment');

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.post('/findall', jsonParser, (req, res) => {
  models.recurrentes.findAll().then((result) => {
    res.send({
      result
    });
  }, (rejectedPromiseError) => {
    res.send(rejectedPromiseError);
    console.error('error message', rejectedPromiseError.message); // eslint-disable-line
  });
});

router.post('/finddone', jsonParser, (req, res) => {
  models.recurrentesDone.findAll().then((result) => {
    res.send({
      result
    });
  }, (rejectedPromiseError) => {
    res.send(rejectedPromiseError);
    console.error('error message', rejectedPromiseError.message); // eslint-disable-line
  });
});

router.post('/findactive', jsonParser, (req, res) => {
  const payload = req.body;
  console.log('payload', payload);
  models.recurrentes.findAll({
      where: payload
    }
  ).then((recurrentesResult) => {
    models.recurrentesDone.findAll().then((doneResult)=> {
      let today = moment();
      let result = recurrentesResult.filter(recurrente => {
        return !doneResult.find(done=> {
          let doneDate = moment(done.done_recurrente, "YYYY-MM-DDTHH:mm:ssZ");
          if (done.recurrente_id == recurrente.id) {
            if (recurrente.periodicity == 7 && doneDate.isSame(today, "week")) {
              return true;
            }
            if (recurrente.periodicity == 30 && doneDate.isSame(today, "month")) {
              return true;
            }
            if (recurrente.periodicity == 365 && doneDate.isSame(today, "year")) {
              return true;
            }
          }
          return false;
        });
      });
      res.send({result});
    }, (rejectedPromiseError) => {
      res.send(rejectedPromiseError);
      console.error('error message', rejectedPromiseError.message); // eslint-disable-line
    });
  }, (rejectedPromiseError) => {
    res.send(rejectedPromiseError);
    console.error('error message', rejectedPromiseError.message); // eslint-disable-line
  });
});

router.post('/findone', jsonParser, (req, res) => {
  const payload = req.body;
  models.recurrentes.findOne({
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
  models.recurrentes.create(
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

router.post('/done', jsonParser, (req, res) => {
  const payload = req.body;
  models.recurrentesDone.create(
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
  models.recurrentes.update(payload, {
    where: {
      id
    }
  }).then((result) => {
    res.send({
      result: result[0]
    });
    // sendMail(payload);
  }, (rejectedPromiseError) => {
    res.send(rejectedPromiseError);
    console.error('error message', rejectedPromiseError.message); // eslint-disable-line
  });
});

router.post('/destroy', jsonParser, (req, res) => {
  const payload = req.body;
  models.recurrentes.destroy({
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
  let type = '';
  let area_id = '';
  let meta_id = '';
  let tarea_id = '';
  let urlText = '';
  if (payload) {
    tarea_id = payload.id;
    if (payload.metas_table) {
      meta_id = payload.metas_table.id
      if (payload.metas_table.areas_table) {
        area_id = payload.metas_table.areas_table.id;
        type = payload.metas_table.areas_table.type;
        urlText = 'Para ver si contenido haga clic <a href="oms.fruandes.com/taskspage/' + type + '/' + area_id + '/' + meta_id + '/' + tarea_id + '">aqui.</a>'
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
      subject: '[FRUANDES] ' + payload.nombre_tarea,
      // text: JSON.stringify(payload)
      html: 'La tarea <strong>' + payload.nombre_tarea + '</strong> se ha actualizado.<br />' + urlText
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

