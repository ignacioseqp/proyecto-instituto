const Alumno = require('./../models/alumnoModel');
const Instructor = require('./../models/instructorModel');
const Curso = require('./../models/cursoModel');
const apiOpciones = require('../apiOpciones');

const fs = require('fs');

let template = fs.readFileSync('templates/alumnos.html', 'utf-8');

exports.crearAlumno = async (req, res) => {
  try {
    console.log('hola');
    let queryAlumnos = await Alumno.find();
    let nuevoId;
    console.log();

    if (queryAlumnos.length < 1) {
      nuevoId = 1;
    } else {
      let query = await Alumno.find().sort({ ide: 1 });
      nuevoId = query[query.length - 1].ide + 1;
    }
    console.log(nuevoId);

    const objeto = {
      ide: nuevoId,
      estado: true,
      apellidos: req.body.apellidos,
      nombres: req.body.nombres,
      documentoTipo: req.body.documentoTipo,
      documentoNro: req.body.documentoNro,
      cursos: req.body.cursos,
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
    let queryCur = await Curso.find().sort({ ide: 1 });

    console.log(alumno);

    alumnosTemplate = alumnosTemplate.replace('${ide}', alumno.ide);
    alumnosTemplate = alumnosTemplate.replace('${nombres}', alumno.nombres);
    alumnosTemplate = alumnosTemplate.replace('${apellidos}', alumno.apellidos);
    if (alumno.estado == true) {
      alumnosTemplate = alumnosTemplate.replace('${checked}', 'checked');
    }
    if (alumno.estado) {
      alumnosTemplate = alumnosTemplate.replace('${estado}', 'Activo');
    } else {
      alumnosTemplate = alumnosTemplate.replace('${estado}', 'Inactivo');
    }
    alumnosTemplate = alumnosTemplate.replace('${ide}', alumno.ide);
    alumnosTemplate = alumnosTemplate.replace(
      '${documentoTipo}',
      alumno.documentoTipo
    );
    alumnosTemplate = alumnosTemplate.replace(
      '${documentoNro}',
      alumno.documentoNro
    );
    if (alumno.cursos[0]) {
      alumnosTemplate = alumnosTemplate.replace('${cursos}', alumno.cursos[0]);
    } else {
      alumnosTemplate = alumnosTemplate.replace('${cursos}', '');
    }
    alumnosTemplate = alumnosTemplate.replace('${email}', alumno.email);
    alumnosTemplate = alumnosTemplate.replace('${domicilio}', alumno.domicilio);
    alumnosTemplate = alumnosTemplate.replace('${telefono}', alumno.telefono);

    const cursosSelec = queryCur
      .map((cur) => {
        if (alumno.cursos[0] == cur.nombre) {
          return `<option value="${cur.nombre}" selected>${cur.nombre}</option>`;
        } else {
          return `<option value="${cur.nombre}">${cur.nombre}</option>`;
        }
      })
      .join('');

    alumnosTemplate = alumnosTemplate.replace('${cursosSelec}', cursosSelec);

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
    const alumno = await Alumno.updateOne({ ide: req.params.ide }, req.body, {
      new: true,
    });

    console.log(alumno);

    res.json({
      status: 'success - actualizado',
      data: { alumno },
    });
  } catch (err) {
    res.json({
      status: 'fail',
      message: err.message,
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
