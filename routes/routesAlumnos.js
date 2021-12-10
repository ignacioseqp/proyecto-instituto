const express = require('express');
const controllerAlu = require('./../controllers/alumnosController');
const { check } = require('express-validator');

const {
  validarJWT,
  validarCampos,
  tieneRole,
  esAdminRole,
} = require('../middlewares');

const routerAlumnos = express.Router();

routerAlumnos.post(
  '/',
  [
    validarJWT,
    esAdminRole,
    check('apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
    check('nombres', 'Los nombres son obligatorios').not().isEmpty(),
    check('documentoTipo', 'El tipo de documento es obligatorio')
      .not()
      .isEmpty(),
    check('documentoNro', 'El tipo de documento es obligatorio')
      .not()
      .isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('domicilio', 'El domicilio es obligatorio').not().isEmpty(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  controllerAlu.crearAlumno
);

routerAlumnos.get('/:ide', controllerAlu.mostrarAlumno);

routerAlumnos.patch(
  '/:ide',
  [
    validarJWT,
    esAdminRole,
    check('apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
    check('nombres', 'Los nombres son obligatorios').not().isEmpty(),
    check('documentoTipo', 'El tipo de documento es obligatorio')
      .not()
      .isEmpty(),
    check('documentoNro', 'El tipo de documento es obligatorio')
      .not()
      .isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('domicilio', 'El domicilio es obligatorio').not().isEmpty(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  controllerAlu.actualizarAlumno
);

module.exports = routerAlumnos;
