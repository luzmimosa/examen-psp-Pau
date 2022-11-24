// connect to mongo utils
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const databaseUrl = "mongodb://localhost"
const databasePort = 27017;
const databaseName = 'tienda';
const url = `${databaseUrl}:${databasePort}/${databaseName}`;

function connect() {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log('Connected to database');
        })
        .catch((err) => {
            console.log('Error connecting to database: ', err);
        });
}

// Article
const articuloSchema = new Schema({
    nombre: String,
    precio: Number,
    imagen: String,
});
const Articulo = mongoose.model('Articulo', articuloSchema);

// User
const clienteSchema = new Schema({
    nombre: String,
    telefono: String,
    categoria: String
});
const Cliente = mongoose.model('Cliente', clienteSchema);

// Add article to utils
function saveArticulo(articulo) {
    articulo.save()
        .then(() => {
            console.log('Articulo saved');
        })
        .catch((err) => {
            console.log('Error saving articulo: ', err);
        });
}

// Add user to utils
function saveCliente(cliente) {
    cliente.save()
        .then(() => {
            console.log('Cliente saved');
        })
        .catch((err) => {
            console.log('Error saving cliente: ', err);
        });
}

// Get all articles from utils
async function getArticulos() {
    return Articulo.find();
}

// Get all users from utils
async function getClientes() {
    return Cliente.find();
}

// Get article by id
async function getArticulo(id) {
    return Articulo.findById(id);
}

// Get user by id
async function getCliente(id) {
    Cliente.findById(id);
}

// Update article
function updateArticulo(articulo) {
    Articulo.updateOne({_id: articulo._id}, articulo)
}

// export models and connect function
module.exports = {
    connect,
    Articulo,
    Cliente,
    getCliente,
    getClientes,
    getArticulo,
    getArticulos,
    saveCliente,
    saveArticulo
}

