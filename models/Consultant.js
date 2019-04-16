tempConsultants = [
    {id: 1, fname: "Bezalel", lname: "Simmel", department: "Physician"},
    {id: 2, fname: "Parto", lname: "Bamford", department: "Orthopedic"},
    {id: 3, fname: "Chirstian", lname: "Koblick", department: "ENT"},
    {id: 4, fname: "Kyoichi", lname: "Maliniak", department: "Neurology"},
    {id: 5, fname: "Anneke", lname: "Preusig", department: "Orthopedic"},
    {id: 6, fname: "Tzvetan", lname: "Zielinski", department: "Physician"},
    {id: 7, fname: "Saniya", lname: "Kalloufi", department: "Cardiology"},
    {id: 8, fname: "Sumant", lname: "Peac", department: "Orthopedic"},
    {id: 9, fname: "Duangkaew", lname: "Piveteau", department: "Physician"},
    {id: 10, fname: "Mary", lname: "Sluis", department: "Gynaecology"},
    {id: 11, fname: "Patricio", lname: "Bridgland", department: "Oncology"},
    {id: 12, fname: "Eberhardt", lname: "Terkki", department: "Physician"},
];

// const db = require('../modules/database');
// const Person = require('./Person');
// const Consultant = db.sequelize.define('Consultant', {
//     id: {
//         type: db.Sequelize.INTEGER.UNSIGNED,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     PersonId: {
//         type: db.Sequelize.INTEGER.UNSIGNED,
//         allowNull: false,
//         onDelete: 'cascade',
//         onUpdate: 'cascade',
//         references: {
//             model: Person,
//             key: 'id'
//         }
//     }, 
// });

module.exports = tempConsultants;