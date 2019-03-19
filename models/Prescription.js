const db = require('../modules/database');
const Patient = require('./Patient');

const Perscription = db.sequelize.define("Perscription", {
    PatientId: {
        type: db.Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
            model: Patient,
            key: 'id'
        }
    },
    Date: db.Sequelize.DATE,
    Validity: db.Sequelize.INTEGER.UNSIGNED
});

module.exports = Perscription;