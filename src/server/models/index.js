const Sequelize = require('sequelize');

let isProduction = process.env.NODE_ENV === 'production';
console.info('isProduction', isProduction);
// isProduction = false;
const DB = isProduction ? require('../../../cfg/server/db.prod.json') : require('../../../cfg/server/db.dev.json');

const sequelize = new Sequelize(
  DB.database,
  DB.username,
  DB.password,
  DB.host);

const db = {};

db.areas = sequelize.import('./areasModel.js');
<<<<<<< HEAD
db.clientes = sequelize.import('./clientesModel.js');
db.custom = sequelize.import('./customModel.js');
=======
>>>>>>> 5431cd70ffe1299da22486f46fe6d038724b7ffc
db.metas = sequelize.import('./metasModel.js');
db.tareasAreas = sequelize.import('./tareasAreasModel.js');
db.usuarios = sequelize.import('./usuariosModel.js');
db.comentariosAreas = sequelize.import('./comentariosAreasModel.js');
db.permisos = sequelize.import('./permisosModel.js');
db.recurrentesDone = sequelize.import('./recurrentesDoneModel.js');
db.recurrentes = sequelize.import('./recurrentesModel.js');
db.log = sequelize.import('./logModel.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
