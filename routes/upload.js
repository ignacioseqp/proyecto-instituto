const express = require('express');
const { check } = require('express-validator');
const {
  uploadArchivo,
  actualizarArchivo,
  actualizarImagenClaudinary,
} = require('../controllers/uploadController');

const {
  validarJWT,
  validarCampos,
  validarArchivo,
  tieneRole,
  esAdminRole,
} = require('../middlewares');

const { coleccionesPermitidas } = require('../helpers/db-validators');

const routerUpload = express.Router();

routerUpload.post('/', uploadArchivo);

routerUpload.put(
  '/:coleccion/:id',
  [
    validarArchivo,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom((c) =>
      coleccionesPermitidas(c, ['instructores', 'alumnos'])
    ),
    validarCampos,
  ],
  actualizarImagenClaudinary
);

module.exports = routerUpload;
