const express = require('express');
const router = express.Router();

const appName = 'Todacién';


router.get('/', (req, res) => {
    res.render('index', {
        title: appName
    });
})

module.exports = router;