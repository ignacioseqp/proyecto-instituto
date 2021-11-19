const express = require('express');
const controllerAlu = require('./../controllers/alumnosController');

const routerAlumnos = express.Router();

// routerAlumnos.route('/estadisticas').get(controller.estadisticas);

// routerAlumnos
//   .route('/listado-filtrado')
//   .get(controller.listadoFiltrado)
//   .get(controller.mostrarAlumnos);
routerAlumnos
  .route('/')
  .get(controllerAlu.mostrarAlumnos)
  .post(controllerAlu.crearAlumno);
routerAlumnos
  .route('/:id')
  .get(controllerAlu.mostrarAlumno)
  .patch(controllerAlu.actualizarAlumno)
  .delete(controllerAlu.eliminarAlumno);

module.exports = routerAlumnos;
