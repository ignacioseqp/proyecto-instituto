const express = require('express');
const controllerCurso = require('./../controllers/cursosController');

const routerCursos = express.Router();

routerCursos.route('/').post(controllerCurso.crearCurso);

routerCursos.route('/:ide').get(controllerCurso.mostrarCurso);

module.exports = routerCursos;
