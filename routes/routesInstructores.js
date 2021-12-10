const express = require('express');
const controllerInstr = require('./../controllers/instructoresController');
const { check } = require('express-validator');

const {
  validarJWT,
  validarCampos,
  tieneRole,
  esAdminRole,
} = require('../middlewares');

const routerInstructores = express.Router();

routerInstructores.post(
  '/',
  [
    validarJWT,
    esAdminRole,
    check('apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
    check('nombres', 'Los nombres son obligatorios').not().isEmpty(),
    check('profTitulo', 'El/La titulo/profesion son obligatorios')
      .not()
      .isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('domicilio', 'El domicilio es obligatorio').not().isEmpty(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  controllerInstr.crearInstructor
);

routerInstructores.get('/:ide', controllerInstr.mostrarInstructor);

routerInstructores.patch(
  '/:ide',
  [
    validarJWT,
    esAdminRole,
    check('apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
    check('nombres', 'Los nombres son obligatorios').not().isEmpty(),
    check('profTitulo', 'El/La titulo/profesion son obligatorios')
      .not()
      .isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('domicilio', 'El domicilio es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  controllerInstr.actualizarInstructor
);

module.exports = routerInstructores;
