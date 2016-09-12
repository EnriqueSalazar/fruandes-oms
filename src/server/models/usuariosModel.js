/**
 * Created by enriq on 10/06/16.
 */
/**
 * Created by enriq on 10/06/16.
 */

const Sequelize = require('sequelize');

module.exports = function defineUsuarioModel (sequelize) {
    return sequelize.define('usuarios_table', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        nombre_usuario: {
            type: Sequelize.STRING
        },
        email_usuario: {
            type: Sequelize.STRING
        },
        perfil: {
            type: Sequelize.STRING
        },
        pwd: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true
    });
};
