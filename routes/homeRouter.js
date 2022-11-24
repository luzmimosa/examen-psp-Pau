const express = require('express');
const {ApplicationName} = require("../StartServer");
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Inicio | ' + ApplicationName
    });
})

module.exports = router;