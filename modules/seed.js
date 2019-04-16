const Person = require('../models/Person');
const Patient = require('../models/Patient');
const Consultant = require('../models/tempCons');
const Receipt = require('../models/Receipt');
const Employee = require('../models/Employee');
const ConsModel = require('../models/Consultant');
const fs = require('fs');
const dtow = require('number-to-words');

module.exports = function (noOfPatients) {
    console.log("Seeding Database");
    let Number_of_Consultant = 10;
    let Salary = 50000.00;
    let WorkHours = 8;
    let ShiftStart = "09:00AM";
    let conFee = 500.00;
    let conFeeWord = dtow.toWords(conFee);
    for (i = 0; i < noOfPatients; i++) {
        let name = randName();
        let fname = name.split(" ")[0];
        let lname = name.split(" ")[1];
        let sex = randGender();
        let dob = randDob();
        let age = calculateAge(dob);
        let address = randAddress();
        let contact = randContact();
        let refBy = randRefferedBy();
        let Consultant = randConsultant();
        let dateTime = randDateTime();
        Person.create({
            Fname: fname,
            Lname: lname,
            Sex: sex,
            Age: age,
            DateOfBirth: dob,
            Address: address,
            ContactNumber: contact
        }).then(person => {
            Patient.create({
                PersonId: person.id,
                ReferredBy: refBy,
                ConsultantAssigned: Consultant.fname.concat(" ").concat(Consultant.lname),
                Department: Consultant.department,
                DateTime: dateTime
            }).then(patient => {
                Receipt.create({
                    PatientId: patient.id,
                    DateTime: dateTime,
                    facilityAvailed: 'Consultancy',
                    DeptName: Consultant.department,
                    Amount: conFee,
                    AmountInWords: conFeeWord
                }).then(receipt => {
                    console.log("New Patient Created with id", patient.id);
                }).catch(err => {
                    console.error(err);
                });
            }).catch(err => {
                console.error(err);
            });
        }).catch(err => {
            console.error(err);
        });
    }
};

function randName() {
    let namesFile = fs.readFileSync('modules/names.json');
    let names = JSON.parse(namesFile).names;
    let randIndex = Math.floor((Math.random() * names.length));
    return names[randIndex];
}

function randGender() {
    let gender = ['Male', 'Female'];
    return gender[Math.floor(Math.random() * 2)];
}

function randDob() {
    let start = new Date(1950, 01, 01);
    let end = new Date(2000, 12, 12);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function calculateAge(date) {
    let now = new Date();
    let diff = (now.getTime() - date.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    return Math.floor(Math.round(diff / 365.25));
}

function randAddress() {
    let addressFile = fs.readFileSync('modules/address.json');
    let address = JSON.parse(addressFile).address;
    let randIndex = Math.floor((Math.random() * address.length));
    return address[randIndex];
}

function randContact() {
    let contactFile = fs.readFileSync('modules/contact.json');
    let contact = JSON.parse(contactFile).contact;
    let randIndex = Math.floor((Math.random() * contact.length));
    return contact[randIndex];
}

function randRefferedBy() {
    let randNum = Math.floor((Math.random() * 100) + 1);
    if (randNum % 5 == 0) {
        return "";
    } else {
        let hptFile = fs.readFileSync('modules/hospitalNames.json');
        let hpt = JSON.parse(hptFile).name;
        let randIndex = Math.floor((Math.random() * hpt.length));
        return hpt[randIndex];
    }
}

function randConsultant() {
    let randIndex = Math.floor(Math.random() * Consultant.length);
    return Consultant[randIndex];
}

function randDateTime() {
    let start = new Date(2015, 01, 01);
    let end = new Date(2018, 12, 12);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}