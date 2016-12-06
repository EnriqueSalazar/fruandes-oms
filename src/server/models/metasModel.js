/**
 * Created by enriq on 10/06/16.
 */
/**
 * Created by enriq on 10/06/16.
 */

const Sequelize = require('sequelize');

module.exports = function defineMetaModel (sequelize) {
    return sequelize.define('metas_table', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        nombre_meta: {
            type: Sequelize.STRING
        },
        avance_meta: {
            type: Sequelize.INTEGER
        },
        done_meta: {
            type: Sequelize.DATE
        },
        deadline_meta: {
            type: Sequelize.DATE
        },
        id_responsable_meta: {
            type: Sequelize.INTEGER
        },
        area_id: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true
    });
};
