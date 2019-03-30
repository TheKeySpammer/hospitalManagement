const db = require('../modules/database');
const Patient = require("./Patient");

const Receipt = db.sequelize.define( "Receipt", {
    id: {
        type: db.Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    PatientId: {
        type: db.Sequelize.INTEGER.UNSIGNED,
        references: {
            model: Patient,
            key: 'id'
        }
    },
    DateTime: {
        type: db.Sequelize.DATE,
        allowNull: false
    },
    facilityAvailed: {
        type: db.Sequelize.ENUM('Consultancy', 'Diagonostics'),
        allowNull: false
    },
    DeptName: {
        type: db.Sequelize.STRING
    },
    Amount:{
        type: db.Sequelize.FLOAT,
        allowNull: false
    },
    AmountInWords: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
}
);

module.exports = Receipt;