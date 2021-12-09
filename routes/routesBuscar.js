const express = require('express');
const { buscar } = require('./../controllers/buscarController');

const routerBuscar = express.Router();

routerBuscar.get('/:coleccion/:termino', buscar);

module.exports = routerBuscar;
