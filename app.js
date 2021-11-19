const express = require('express');
const routerInstituto = require('./routes/routesInstituto');
const routerCursos = require('./routes/routesCursos');
const routerInstructores = require('./routes/routesInstructores');
const routerAlumnos = require('./routes/routesAlumnos');

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.use('/', routerInstituto);
app.use('/cursos', routerCursos);
// app.use('/instructores', routerInstructores);
app.use('/alumnos', routerAlumnos);

module.exports = app;
