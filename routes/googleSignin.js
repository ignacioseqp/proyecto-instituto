const express = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { google } = require('../controllers/googleSignin');

const routerGoogle = express.Router();

routerGoogle.get('/googlesignin', google);

module.exports = routerGoogle;
