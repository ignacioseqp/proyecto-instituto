const express = require('express');
const routerInstituto = require('./routes/routesInstituto');
const routerCursos = require('./routes/routesCursos');
const routerInstructores = require('./routes/routesInstructores');
const routerAlumnos = require('./routes/routesAlumnos');

const app = express();

app.use(express.json());

app.use('/', express.static('public'), routerInstituto);
app.use('/cursos', express.static('public'), routerCursos);
app.use('/alumnos', express.static('public'), routerAlumnos);
app.use('/instructores', express.static('public'), routerInstructores);

module.exports = app;
