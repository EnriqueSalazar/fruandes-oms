/**
 * Created by enriq on 10/06/16.
 */
/**
 * Created by enriq on 10/06/16.
 */

const Sequelize = require('sequelize');

module.exports = function definePermisoModel (sequelize) {
    return sequelize.define('permisos_table', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
       area_id: {
            type: Sequelize.INTEGER
        },
       usuario_id: {
            type: Sequelize.INTEGER
        },

    }, {
        freezeTableName: true
    });
};
