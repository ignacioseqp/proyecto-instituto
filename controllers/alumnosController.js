const Alumno = require('./../models/alumnoModel');
const Instructor = require('./../models/instructorModel');
const Curso = require('./../models/cursoModel');
const apiOpciones = require('../apiOpciones');

const fs = require('fs');

let template = fs.readFileSync('templates/alumnos.html', 'utf-8');

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

exports.mostrarAlumno = async (req, res) => {
  try {
    let alumnosTemplate = template;
    let alumno = await Alumno.findOne({ ide: req.params.ide });
    let instructor = await Instructor.find();
    let curso = await Curso.find();

    console.log(alumno);

    alumnosTemplate = alumnosTemplate.replace('${ide}', alumno.ide);
    alumnosTemplate = alumnosTemplate.replace('${nombres}', alumno.nombres);
    alumnosTemplate = alumnosTemplate.replace('${apellidos}', alumno.apellidos);
    alumnosTemplate = alumnosTemplate.replace('${ide}', alumno.ide);
    alumnosTemplate = alumnosTemplate.replace(
      '${documentoTipo}',
      alumno.documentoTipo
    );
    alumnosTemplate = alumnosTemplate.replace(
      '${documentoNro}',
      alumno.documentoNro
    );
    alumnosTemplate = alumnosTemplate.replace('${email}', alumno.email);
    alumnosTemplate = alumnosTemplate.replace('${domicilio}', alumno.domicilio);
    alumnosTemplate = alumnosTemplate.replace('${telefono}', alumno.telefono);

    res.send(alumnosTemplate);
  } catch (err) {
    res.json({
      status: 'fail',
      message: 'Template no se pudo cargar!',
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
