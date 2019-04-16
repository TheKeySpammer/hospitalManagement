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
        allowNull: false,
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
            model: Person,
            key: 'id'
        }
    },
    ReferredBy: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    ConsultantAssigned: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    Department: {
        type: db.Sequelize.STRING,
    },
    DateTime: {
        type: db.Sequelize.DATE,
        defaultValue: db.Sequelize.NOW
    },
    Validity: {
        type: db.Sequelize.INTEGER,
        defaultValue: 7
    }    
}
);
module.exports = Patient;