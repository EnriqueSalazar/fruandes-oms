const Sequelize = require('sequelize');

module.exports = function defineClientesModel(sequelize) {
  return sequelize.define('clientes_table', {
    nombre_clientes: {
      type: Sequelize.STRING
    },
    email_clientes: {
      type: Sequelize.STRING
    },
     telefono_clientes: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.INTEGER
    },
    jsonCustom: {
      type: Sequelize.STRING
    }
  }, {
    freezeTableName: true
  });
};
