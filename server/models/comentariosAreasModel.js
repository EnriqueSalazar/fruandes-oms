/**
 * Created by enriq on 10/06/16.
 */
/**
 * Created by enriq on 10/06/16.
 */

const Sequelize = require('sequelize');

module.exports = function defineCOmentariosAreasModel (sequelize) {
    return sequelize.define('comentarios_areas_table', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        area_id: {
            type: Sequelize.INTEGER
        },
        meta_id: {
            type: Sequelize.INTEGER
        },
        tarea_id: {
            type: Sequelize.INTEGER
        },
        usuario_id: {
            type: Sequelize.INTEGER
        },
        is_active: {
            type: Sequelize.BOOLEAN
        },
        comentario: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true
    });
};
