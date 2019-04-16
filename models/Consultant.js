const db = require('../modules/database');
const Employee = require('./Employee');
const Consultant = db.sequelize.define('Consultant', {
    id: {
        type: db.Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    empId: {
        type: db.Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
            model: Employee,
            key: 'id'
        }
    },
    department: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Consultant;