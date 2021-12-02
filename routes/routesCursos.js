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
    tieneRole('ADMIN_ROLE', 'USER_ROLE'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  controllerCurso.crearCurso
);

routerCursos.get('/:ide', controllerCurso.mostrarCurso);

routerCursos.patch(
  '/:ide',
  [
    validarJWT,
    tieneRole('ADMIN_ROLE', 'USER_ROLE'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('fechaDesde', 'La fecha de inicio es obligatoria').not().isEmpty(),
    check('fechaHasta', 'La fecha de finalización es obligatoria')
      .not()
      .isEmpty(),
    validarCampos,
  ],
  controllerCurso.actualizarCurso
);

routerCursos.delete(
  '/:ide',
  [
    validarJWT,
    esAdminRole,
    check('estado', 'El estado es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  controllerCurso.desactivarCurso
);

module.exports = routerCursos;
