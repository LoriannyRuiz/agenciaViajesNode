//importando express
//const express = require('express'); es lo mismo pero esta es la version de common js y la otra de imports
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv/config'



console.log(process.env.DB_HOST)

//todos son middleware de express y alguno lo creamos ya que pueden haber propios

//esto devuelve una instancia, solo se puede hacer una sola vez pero a traves de esto podremos crear algunas cosas mas;
const app = express();

//conectar la base de datos
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error));


//definir puerto 
const port = process.env.PORT || 5000;

//habilitar Pug
app.set('view engine', 'pug');

//obtener el ano actual
app.use((req, res, next)=> {
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";

    next();
});

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//Definir carpeta publica
app.use(express.static('public'));
/* Por lo tanto, express.static() es una función middleware en 
Express porque procesa una solicitud HTTP y una respuesta HTTP,
 y luego pasa el control a la siguiente función middleware o a 
 la función de manejo final. */

//Agregar Router
app.use('/', router);

//arrancando el servidor
app.listen(port, ()=> {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})

