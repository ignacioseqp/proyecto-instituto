const express = require('express');
const controllerAlu = require('./../controllers/alumnosController');

const routerAlumnos = express.Router();

routerAlumnos.route('/').post(controllerAlu.crearAlumno);
routerAlumnos
  .route('/:ide')
  .get(controllerAlu.mostrarAlumno)
  .patch(controllerAlu.actualizarAlumno)
  .delete(controllerAlu.eliminarAlumno);

module.exports = routerAlumnos;
