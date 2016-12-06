const Sequelize = require('sequelize');

module.exports = function defineCustomModel(sequelize) {
  return sequelize.define('custom_clientes_table', {
    jsonCustoms: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.INTEGER
    },
    nombre_tipo: {
      type: Sequelize.STRING
    }

  }, {
    freezeTableName: true
  });
};
