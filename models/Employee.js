const db = require('../modules/database');
const Person = require('./Person');
const  Employee = db.sequelize.define("Employee", {
    id: {
        type: db.Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    PersonId: {
        type: db.Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
            model: Person,
            key: 'id'
        }
    },
    Salary: {
        type: db.Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    ShiftStart: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    WorkHours: {
        type: db.Sequelize.INTEGER
    }
});

module.exports = Employee;