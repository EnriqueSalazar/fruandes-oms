/**
 * Created by enriq on 10/06/16.
 */
const Sequelize = require('sequelize');

module.exports = function defineTareasAreasModel (sequelize) {
  return sequelize.define('tareas_areas_table', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    nombre_tarea: {
      type: Sequelize.STRING
    },
    meta_id: {
      type: Sequelize.INTEGER
    },
    deadline_tarea: {
      type: Sequelize.DATE
    },
    done_tarea: {
      type: Sequelize.DATE
    },
    id_responsable_tarea: {
      type: Sequelize.INTEGER
    },
    estado_tarea: {
      type: Sequelize.BOOLEAN
    }
  }, {
    freezeTableName: true
  });
};
