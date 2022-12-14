const express = require('express');
const router = express.Router();
const database = require('../utils/Database');
const buttons = require("../utils/Buttons");

const appName = 'Todacién';

router.get('/clientes', (req, res) => {

    res.render('clientes/clientes_index', {
        title: 'Clientes',
        application: appName,
        navbuttons: [
            buttons.INICIO,
            buttons.ARTICULOS
        ]
    })
});

router.get('/clientes/listado', async (req, res) => {

    let clientList = await database.getClientes()

    res.render('clientes/clientes_listado', {
        title: 'Listado de clientes',
        application: appName,
        navbuttons: [
            buttons.CLIENTES
        ],
        clientes: clientList
    });
});

router.get('/clientes/alta', (req, res) => {
    let error = null;
    if (req.query.fallo) {
        error = req.query.fallo;
    }
    res.render('clientes/clientes_alta', {
        title: 'Alta de cliente',
        application: appName,
        navbuttons: [
            buttons.CLIENTES
        ],
        error: error
    })
})

router.get('/clientes/nuevoCliente', async (req, res) => {
    let name = req.query.nombre;
    let tel = req.query.telefono;
    let cat = req.query.categoria;

    if (!name || !tel || !cat) {
        res.redirect('/clientes/alta?fallo="Faltan datos"');
        return;
    }

    let newClient = new database.Cliente({
        nombre: name,
        telefono: tel,
        categoria: cat
    });

    await database.saveCliente(newClient);

    res.redirect('/clientes/listado');
})

module.exports = router;