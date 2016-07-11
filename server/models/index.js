const Sequelize = require('sequelize');
const DB = require('../config/db.json');

const sequelize = new Sequelize(
  DB.database,
  DB.username,
  DB.password,
  DB.host);

const db = {};

db.areas = sequelize.import('./areasModel.js');
db.metas = sequelize.import('./metasModel.js');
db.tareasAreas = sequelize.import('./tareasAreasModel.js');
db.usuarios = sequelize.import('./usuariosModel.js');
db.comentariosAreas = sequelize.import('./comentariosAreasModel.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
