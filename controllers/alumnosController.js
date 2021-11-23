const Alumno = require('./../models/alumnoModel');
const Instructor = require('./../models/instructorModel');
const Curso = require('./../models/cursoModel');
const apiOpciones = require('../apiOpciones');

const fs = require('fs');

let mainTemplate = fs.readFileSync('templates/index.html', 'utf-8');

// app.post('/cursos', function (req, res) {
//   console.log(req.body);
//   // crear el objeto
//   const nuevoId = dataApp.cursos[dataApp.cursos.length - 1].id + 1;

//   const objeto = {
//     id: nuevoId,
//     nombre: req.body.nombre,
//     estado: 'Activo',
//     fechaDesde: req.body.fechaDesde,
//     fechaHasta: req.body.fechaHasta,
//     horarios: req.body.horarios,
//     instructores: [],
//     alumnos: [],
//   };

//   // almacenar en data
//   dataApp.cursos.push(objeto);

//   fs.writeFile('dev-data/appData.json', JSON.stringify(dataApp), (err) => {
//     res.status(201).json({
//       status: 'success',
//       data: {
//         cursos: objeto,
//       },
//     });
//   });
// });

// app.post('/instructores', function (req, res) {
//   console.log(req.body);
//   // crear el objeto
//   const nuevoId = dataApp.instructores[dataApp.instructores.length - 1].id + 1;

//   const objeto = {
//     id: nuevoId,
//     apellidos: req.body.apellidos,
//     nombres: req.body.nombres,
//     profTitulo: req.body.profTitulo,
//     email: req.body.email,
//     domicilio: req.body.domicilio,
//     telefono: req.body.telefono,
//   };

//   // almacenar en data
//   dataApp.instructores.push(objeto);

//   fs.writeFile('dev-data/appData.json', JSON.stringify(dataApp), (err) => {
//     res.status(201).json({
//       status: 'success',
//       data: {
//         instructores: objeto,
//       },
//     });
//   });
// });

exports.crearAlumno = async (req, res) => {
  try {
    let query = await Alumno.find().sort({ ide: 1 });
    const nuevoId = query[query.length - 1].ide + 1;

    const objeto = {
      ide: nuevoId,
      apellidos: req.body.apellidos,
      nombres: req.body.nombres,
      documentoTipo: req.body.documentoTipo,
      documentoNro: req.body.documentoNro,
      email: req.body.email,
      domicilio: req.body.domicilio,
      telefono: req.body.telefono,
    };

    console.log(objeto);

    const nuevoAlumno = await Alumno.create(objeto);
    res.json({
      status: 'success',
      data: {
        alumno: nuevoAlumno,
      },
    });
  } catch (err) {
    res.json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.mostrarAlumnos = async (req, res) => {
  try {
    let queryAlu = await Alumno.find();
    let queryIns = await Instructor.find();
    let queryCur = await Curso.find();

    const aluHtml = queryAlu
      .map((alu) => {
        return `<tr>
    <td>${alu.id}</td>
    <td>${alu.apellidos}</td>
    <td>${alu.nombres}</td>
    <td>${alu.documentoTipo}</td>
    <td>${alu.documentoNro}</td>
    <td>${alu.email}</td>
    <td>${alu.domicilio}</td>
    <td>${alu.telefono}</td>
  </tr>`;
      })
      .join('');

    mainTemplate = mainTemplate.replace('${alumnos}', aluHtml);

    res.send(mainTemplate);
  } catch (err) {
    res.json({
      status: 'fail',
      message: 'Error de datos!',
    });
  }
};

exports.mostrarAlumno = async (req, res) => {
  try {
    const alumno = await Alumno.findById(req.params.id);

    res.json({
      status: 'success',
      data: {
        alumno,
      },
    });
  } catch (err) {
    res.json({
      status: 'fail',
      message: 'Datos incorrectos!',
    });
  }
};

exports.actualizarAlumno = async (req, res) => {
  try {
    const alumno = await Alumno.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({
      status: 'success',
      data: alumno,
    });
  } catch (err) {
    res.json({
      status: 'fail',
      data: 'Datos incorrectos!',
    });
  }
};

exports.eliminarAlumno = async (req, res) => {
  try {
    await Alumno.findByIdAndDelete(req.params.id);

    res.json({
      status: 'success',
      data: 'Alumno eliminado',
    });
  } catch (err) {
    res.json({
      status: 'success',
      data: 'Datos incorrectos!',
    });
  }
};

//Aliasing
exports.listadoFiltrado = async (req, res, next) => {
  req.query.page = '1';
  req.query.limit = '2';
  req.query.fields = 'apellido, nombres, edad,-_id';
  req.query.sort = 'nombres,edad';
  next();
};
