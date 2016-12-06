/**
 * Created by enriq on 10/06/16.
 */
const Sequelize = require('sequelize');

module.exports = function defineRecurrentesDoneModel (sequelize) {
  return sequelize.define('recurrentes_done_table', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    recurrente_id: {
      type: Sequelize.INTEGER
    },
    usuario_id: {
      type: Sequelize.INTEGER
    },
    done_recurrente: {
      type: Sequelize.DATE
    }
  }, {
    freezeTableName: true
  });
};
