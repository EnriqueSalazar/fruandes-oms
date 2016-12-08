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
     periodo: {
      type: Sequelize.INTEGER
    },
    deadline_tarea: {
      type: Sequelize.DATE
    },
    startAt: {
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
    },
    is_notificaciones: {
      type: Sequelize.BOOLEAN
    },
<<<<<<< HEAD
    is_recurrente: {
      type: Sequelize.BOOLEAN
    },
    cliente_id: {
      type: Sequelize.INTEGER
    }

=======
   is_recurrente: {
      type: Sequelize.BOOLEAN
    }
>>>>>>> 5431cd70ffe1299da22486f46fe6d038724b7ffc
  }, {
    freezeTableName: true
  });
};
