/**
 * Created by enriq on 10/06/16.
 */
const Sequelize = require('sequelize');

module.exports = function defineRecurrentesModel (sequelize) {
  return sequelize.define('recurrentes_table', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    nombre_recurrente: {
      type: Sequelize.STRING
    },
    id_responsable_recurrente: {
      type: Sequelize.INTEGER
    },
    periodicity: {
      type: Sequelize.INTEGER
    }
  }, {
    freezeTableName: true
  });
};
