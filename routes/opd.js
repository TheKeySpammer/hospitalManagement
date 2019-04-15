const express = require('express'),
      router = express.Router(),
      db = require('../modules/database'),
      Person = require('../models/Person'),
      Patient = require('../models/Patient'),
      Consultants = require("../models/Consultant"),
      Department = require('../models/Department'),
      Receipt = require('../models/Receipt'),
      dtow = require('number-to-words');

router.get('/', (req, res) => {
    // Find all the patients that came today.
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let todayString = `${today.getFullYear()}-%${today.getMonth() + 1}-${today.getDate()}%`;
    db.sequelize.query('SELECT * from listPatient where DateTime like ?', {replacements: [todayString], type: db.sequelize.QueryTypes.SELECT})
    .then(patients => {
        res.render('opd/index', {patients: patients});
    }).catch(err => {
        res.send("Database error");
        console.error(err);
    });
});

router.get('/search', (req, res) => {
    console.log("This is the opd search funtion");
    let queryType = req.query.searchType;
    let queryText = req.query.query;
    let validQueryType = ['id', 'Name', 'Department', 'ConsultantAssigned'];
    if (validQueryType.indexOf(queryType) == -1) {
        console.error("Invalid Query Type");
        res.send('Invalid query Type error');
    }
    let query = `SELECT * from listPatient where ${queryType}=?`;
    let queryOption = {type: db.sequelize.QueryTypes.SELECT};
    if (queryType === "Name") {
        let fname = queryText.split(" ")[0];
        let mname = queryText.split(" ")[1];
        let lname = queryText.split(" ")[2];
        if (mname && lname) {
            query = "SELECT * from listPatient where Fname=? and Mname=? and Lname=?";
            queryOption.replacements = [fname, mname, lanme];
        } else if (mname) {
            query = "SELECT * from listPatient where Fname=? and Mname=?";
            queryOption.replacements = [fname, mname];
        } else {
            query = "SELECT * from listPatient where Fname=?";
            queryOption.replacements = [fname];
        }
    }else{
        queryOption.replacements = [queryText];
    }
    query = query.concat(" ORDER BY DateTime");
    db.sequelize.query(query, queryOption)
    .then(patients => {
        res.render('opd/search', {patients: patients});
    }).catch(err => {
        console.error(err);
        res.send("Database error occured");
    });
}); 


router.get('/new', (req, res) => {
    res.render('opd/new', {Consultants: Consultants});
});

router.post('/', (req, res) => {
    let conFee = 500.00;
    let conFeeWord = dtow.toWords(conFee);
    let fname = req.body.fname;
    let mname = req.body.mname;
    let lname = req.body.lname;
    let gender = req.body.gender;
    let dob = new Date(req.body.dob);
    let age = calculateAge(dob);
    let address = req.body.address;
    let contact = "(+91) " + req.body.contact;
    let referredBy = req.body.referredBy;
    let consultant = parseInt(req.body.consultant, 10);
    let consultantName = "";
    let department= "";
    let dateTime = new Date();
    Consultants.forEach(function (Consultant) { 
        if(consultant === Consultant.id) {
            consultantName = Consultant.fname + " " + Consultant.lname;
            department = Consultant.department;
        }
    });
    Person.create({
        Fname: fname,
        Mname: mname,
        Lname: lname,
        Sex: gender,
        Age: age,
        DateOfBirth: dob,
        Address: address,
        ContactNumber: contact
    }).then(person => {
        Patient.create({
            PersonId: person.id,
            ReferredBy: referredBy,
            ConsultantAssigned: consultantName,
            Department: department,
            DateTime: dateTime
        }).then(patient => {
            Receipt.create({
                PatientId: patient.id,
                DateTime: dateTime,
                facilityAvailed: 'Consultancy',
                DeptName: department,
                Amount: conFee,
                AmountInWords: conFeeWord
            }).then(receipt => {
                console.log("New patient Created");
                console.log(patient);
                res.redirect('/opd');
            }).catch(err => {
                console.error(err);
            });
        }).catch(err => {
            res.send("An error occured");
            console.log(err);
        });
    }).catch(err => {
        res.send("Sorry and error occured.");
        console.error(err);
    });
});

function calculateAge(date) {
    let now = new Date();
    let diff = (now.getTime() -date.getTime()) / 1000;
    diff /= (60*60*24);
    return Math.floor(Math.round(diff/365.25));
}

module.exports = router;