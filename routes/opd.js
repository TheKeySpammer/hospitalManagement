const express = require('express'),
      router = express.Router(),
      db = require('../modules/database'),
      Person = require('../models/Person'),
      Patient = require('../models/Patient');

router.get('/', (req, res) => {
    res.render('opd/index');
});

router.get('/new', (req, res) => {
    res.render('opd/new');
});

router.post('/', (req, res) => {

});

module.exports = router;