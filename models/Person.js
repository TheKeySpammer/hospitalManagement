const db = require("../modules/database");

const Person = db.sequelize.define("Person", {
    id: {
        type: db.Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    Fname: {
        type: db.Sequelize.STRING,
        allowNull: false,
    }, 
    Mname: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    Lname: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    Sex: {
        type: db.Sequelize.ENUM('Male', 'Female', 'Other'),
        allowNull: false
    },
    Age: {
        type: db.Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    DateOfBirth: {
        type: db.Sequelize.DATEONLY,
        allowNull: false
    },
    Address: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    ContactNumber: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
}, {
    getterMethods: {
        fullName() {
            return this.Fname+' '+this.Mname+' '+this.Lname;
        }
    }
});

module.exports = Person;