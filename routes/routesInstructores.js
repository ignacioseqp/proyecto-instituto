const express = require('express');
const controller = require('./../controllers/instructoresController');

const routerInstructores = express.Router();

routerInstructores.route('/').post(controller.crearInstructor);
routerInstructores
  .route('/:ide')
  .get(controller.mostrarInstructor)
  .patch(controller.actualizarInstructor)
  .delete(controller.eliminarInstructor);

module.exports = routerInstructores;
