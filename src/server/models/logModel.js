/**
 * Created by enriq on 10/06/16.
 */
/**
 * Created by enriq on 10/06/16.
 */

const Sequelize = require('sequelize');

module.exports = function defineLogModel (sequelize) {
    return sequelize.define('log_table', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        body: {
            type: Sequelize.TEXT
        },
        task: {
            type: Sequelize.TEXT
        },
        usuario_id: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true
    });
};
