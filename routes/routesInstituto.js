const express = require('express');
const controllerInstituto = require('./../controllers/institutoController');

const routerInstituto = express.Router();

routerInstituto.route('/').get(controllerInstituto.mostrarTodo);

module.exports = routerInstituto;
