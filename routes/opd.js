const express = require('express'),
      router = express.Router(),
      db = require('../modules/database'),
      Person = require('../models/Person'),
      Patient = require('../models/Patient'),
      Consultants = require("../models/Consultant"),
      Department = require('../models/Department');

router.get('/', (req, res) => {
    // Find all the patients that came today.
    
    res.render('opd/index');
});

router.get('/new', (req, res) => {
    res.render('opd/new', {Consultants: Consultants});
});

router.post('/', (req, res) => {
    let fname = req.body.fname;
    let mname = req.body.mname;
    let lname = req.body.lname;
    let gender = req.body.gender;
    let dob = new Date(req.body.dob);
    let age = calculateAge(dob);
    let address = req.body.address;
    let contact = "(+91)" + req.body.contact;
    let referredBy = req.body.referredBy;
    let consultant = parseInt(req.body.consultant, 10);
    let consultantName = "";
    let department= "";
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
            DateTime: new Date()
        }).then(patient => {
            console.log("New patient Created");
            console.log(patient);
            res.redirect('/opd');
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