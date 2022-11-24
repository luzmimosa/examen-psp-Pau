const express = require('express');
const router = express.Router();
const multer = require('multer');
const database = require('../utils/Database');
const fs = require("fs");
const buttons = require('../utils/Buttons');

const appName = 'Todacién';

const imageParser = multer({ dest: __dirname + '/../public/images/' });

router.get('/articulos', async(req, res) => {

    let avaiableArticles = await database.getArticulos();

    res.render('articulos/articulos_index', {
        title: 'Artículos',
        application: appName,
        navbuttons: [
            buttons.INICIO,
            buttons.ARTICULOS_ALTA
        ],
        articulos: avaiableArticles
    });
})

router.get('/articulos/articulo/:id', async(req, res) => {

        let article = await database.getArticulo(req.params.id);

        res.render('articulos/articulos_ficha', {
            title: article.nombre,
            application: appName,
            navbuttons: [
                buttons.ARTICULOS
            ],
            articulo: article
        });
})

router.get('/articulos/alta', async (req, res) => {

    let fail = null;

    if (req.query.fail) {
        fail = req.query.fail;
    }

    res.render('articulos/articulos_alta', {
        title: 'Alta de artículo',
        application: appName,
        navbuttons: [
            buttons.ARTICULOS
        ],
        error: fail
    });
})

router.post('/articulos/altaArticulo', imageParser.single('imagen'), async (req, res) => {

    let articleName = req.body.nombre;
    let articlePrice = req.body.precio;
    let imageName = undefined;
    if (req.file) {
        imageName = req.file.filename;
    }

    if (!articleName || !articlePrice) {
        res.redirect('/articulos/alta?fail="Error al crear el artículo"');
    }

    let newArticle = new database.Articulo({
        nombre: articleName,
        precio: articlePrice,
        imagen: imageName
    })

    database.saveArticulo(newArticle);

    res.redirect('/articulos');
})

router.get('/articulos/eliminar/:id', async (req, res) => {

    // eliminar imagen
    let article = await database.getArticulo(req.params.id);
    if (article.imagen) {
        // path for both windows and linux
        await removeImage(article.imagen)
    }

    // eliminar de la database
    //await database.removeArticulo(req.params.id);

    res.redirect('/articulos');
})

router.get('/articulos/modificar/:id', async (req, res) => {
    let article = await database.getArticulo(req.params.id);

    if (!article) {
        res.redirect('/articulos');
        return;
    }

    res.render('articulos/articulos_modificar', {
        title: 'Modificar artículo',
        application: appName,
        navbuttons: [
            buttons.ARTICULOS
        ],
        articulo: article
    });
})

router.post('/articulos/aplicarModificacion', imageParser.single('imagen'), async (req, res) => {

    let article = await database.getArticulo(req.body.articleid);

    if (!article) {
        res.redirect('/articulos/alta?fail=Error al modificar el artículo');
        return;
    }

    // remove current image if there is a new one

    if (req.file) {
        await removeImage(article.imagen);

        article.imagen = req.file.filename
    }

    article.nombre = req.body.nombre ? req.body.nombre : article.nombre;
    article.precio = req.body.precio ? req.body.precio : article.precio;

    await database.saveArticulo(article);

    res.redirect('/articulos');

})

async function removeImage(name) {

    if (name.length > 0) {
        let path = __dirname + '/../public/images/' + name
        await fs.unlink(path, (err) => {console.log(err)});
    }
}

module.exports = router;