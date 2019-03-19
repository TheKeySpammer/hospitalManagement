const db = require('../modules/database');
const Person = require("./Person");
const Patient = db.sequelize.define( "Patient", {
    id: {
        type: db.Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    PersonId: {
        type: db.Sequelize.INTEGER.UNSIGNED,
        references: {
            model: Person,
            key: 'id'
        }
    },
    ReferredBy: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    // DoctorTreating: {
    //     type: db.Sequelize.INTEGER.UNSIGNED,
    //     references: {
    //         model: Doctor,
    //         key: 'id'
    //     }
    // }
}
);

module.exports = Patient;