const express = require('express');
const controllerCurso = require('./../controllers/cursosController');
const { check } = require('express-validator');

const {
  validarJWT,
  validarCampos,
  tieneRole,
  esAdminRole,
} = require('../middlewares');

const routerCursos = express.Router();

routerCursos.post(
  '/',
  [
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('fechaDesde', 'La fecha de inicio es obligatoria').not().isEmpty(),
    check('fechaHasta', 'La fecha de finalización es obligatoria')
      .not()
      .isEmpty(),
    validarCampos,
  ],
  controllerCurso.crearCurso
);

routerCursos.get('/:ide', controllerCurso.mostrarCurso);

routerCursos.patch(
  '/:ide',
  [
    validarJWT,
    esAdminRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('fechaDesde', 'La fecha de inicio es obligatoria').not().isEmpty(),
    check('fechaHasta', 'La fecha de finalización es obligatoria')
      .not()
      .isEmpty(),
    validarCampos,
  ],
  controllerCurso.actualizarCurso
);

module.exports = routerCursos;
