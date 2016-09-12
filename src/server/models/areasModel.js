const Sequelize = require('sequelize');

module.exports = function defineAreasModel(sequelize) {
  return sequelize.define('areas_table', {
    nombre_area: {
      type: Sequelize.STRING
    },
    descripcion_area: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.INTEGER
    },
    deadline_proyecto: {
      type: Sequelize.DATE
    }
  }, {
    freezeTableName: true
  });
};
