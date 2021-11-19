const express = require('express');
const controller = require('./../controllers/instructoresController');

const routerInstructores = express.Router();

// routerAlumnos.route('/estadisticas').get(controller.estadisticas);

// routerAlumnos
//   .route('/listado-filtrado')
//   .get(controller.listadoFiltrado)
//   .get(controller.mostrarAlumnos);
routerInstructores.route('/').get(controller.mostrarInstructores);
//   .post(controller.crearAlumno);
//   routerInstructores
//   .route('/:id')
//   .get(controller.mostrarAlumno)
//   .patch(controller.actualizarAlumno)
//   .delete(controller.eliminarAlumno);

module.exports = routerInstructores;
