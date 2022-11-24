const express = require('express');
const database = require('./utils/Database');



// Connect to database
database.connect();


// Import routers
const homeRouter = require('./routes/homeRouter');
const articlesRouter = require('./routes/articlesRouter');
const clientsRouter = require('./routes/clientsRouter');
const fs = require("fs");

// Setup app
const app = express();
app.set('view engine', 'hbs');

// Setup routers
app.use(express.static(__dirname + '/'), homeRouter);
app.use(express.static(__dirname + '/articulos'), articlesRouter);
app.use(express.static(__dirname + '/clientes'), clientsRouter);

app.get('/images/', (req, res) => {
    res.redirect('/images/ñ');
})

app.get('/images/:name', async (req, res) => {
    let path = __dirname + '/public/images/' + req.params.name
    console.log("Params: (" + req.params.name + ") Path: (" + path + ")");

    // if the image exists, send it. Otherwise, send the default image (default.png)
    if (fs.existsSync(path) && req.params.name !== '') {
        res.sendFile(path);
        return;
    }
    res.sendFile(__dirname + '/public/images/default/default.gif');
})

app.get('/css/:name', async (req, res) => {
    let path = __dirname + '/public/css/' + req.params.name

    //if the css exists, send it. Otherwise, send an error
    if (fs.existsSync(path)) {
        res.sendFile(path);
    } else {
        res.status(404).send('Not found');
    }
})

// Start server
app.listen(3000, () => {
    console.log('Server on port 3000');
});


module.exports = {
    ApplicationName
}