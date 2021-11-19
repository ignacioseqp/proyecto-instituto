const Curso = require('./../models/cursoModel');
const fs = require('fs');

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

exports.crearCurso = async (req, res) => {
  try {
    // let query = await Curso.find();
    // const nuevoId = query[query.length - 1] + 1;
    console.log('Hola');

    const objeto = {
      id: 2,
      nombre: req.body.nombre,
      estado: false,
      fechaDesde: req.body.fechaDesde,
      fechaHasta: req.body.fechaHasta,
      horarios: req.body.horarios,
      instructores: [],
      alumnos: [],
    };

    const nuevoCurso = await Curso.create(objeto);
    console.log(nuevoCurso);
    res.json({
      status: 'success',
      data: {
        curso: nuevoCurso,
      },
    });
  } catch (err) {
    res.json({
      status: 'fail',
      message: err.message,
    });
  }
};
