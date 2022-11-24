const express = require('express');
const database = require('./utils/Database');

const ApplicationName = 'Todacién';


// Import routers
const homeRouter = require('./routes/homeRouter');
const articlesRouter = require('./routes/articlesRouter');
const clientsRouter = require('./routes/clientsRouter');

// Setup app
const app = express();
app.set('view engine', 'hbs');

// Setup routers
app.use(express.static(__dirname + '/'), homeRouter);
app.use(express.static(__dirname + '/articulos'), articlesRouter);
app.use(express.static(__dirname + '/clientes'), clientsRouter);

// Start server
app.listen(3000, () => {
    console.log('Server on port 3000');
});


module.exports = {
    ApplicationName
}