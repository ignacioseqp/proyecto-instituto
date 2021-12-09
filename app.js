const express = require('express');
const cors = require('cors');
const routerInstituto = require('./routes/routesInstituto');
const routerAuth = require('./routes/auth');
const routerUsuarios = require('./routes/usuarios');
const routerCursos = require('./routes/routesCursos');
const routerInstructores = require('./routes/routesInstructores');
const routerAlumnos = require('./routes/routesAlumnos');
const routerBuscar = require('./routes/routesBuscar');
const routerUpload = require('./routes/upload');
const fileUpload = require('express-fileupload');

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

app.use('/', express.static('public'), routerInstituto);
app.use('/login', express.static('public'), routerAuth);
app.use('/upload', routerUpload);
app.use('/api/usuarios', express.static('public'), routerUsuarios);
app.use('/buscar', express.static('public'), routerBuscar);
app.use('/cursos', express.static('public'), routerCursos);
app.use('/alumnos', express.static('public'), routerAlumnos);
app.use('/instructores', express.static('public'), routerInstructores);

module.exports = app;
