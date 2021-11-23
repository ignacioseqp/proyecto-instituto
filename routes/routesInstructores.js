const express = require('express');
const controller = require('./../controllers/instructoresController');

const routerInstructores = express.Router();

routerInstructores.route('/').post(controller.crearInstructor);
//   routerInstructores
//   .route('/:id')
//   .get(controller.mostrarAlumno)
//   .patch(controller.actualizarAlumno)
//   .delete(controller.eliminarAlumno);

module.exports = routerInstructores;
