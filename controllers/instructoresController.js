const fs = require('fs');
const Instructor = require('./../models/instructorModel');

let template = fs.readFileSync('templates/instructores.html', 'utf-8');

exports.crearInstructor = async (req, res) => {
  try {
    let query = await Instructor.find().sort({ ide: 1 });
    const nuevoId = query[query.length - 1].ide + 1;

    const objeto = {
      ide: nuevoId,
      estado: true,
      apellidos: req.body.apellidos,
      nombres: req.body.nombres,
      profTitulo: req.body.profTitulo,
      cursos: [],
      email: req.body.email,
      domicilio: req.body.domicilio,
      telefono: req.body.telefono,
    };

    console.log(objeto);

    const nuevoInstructor = await Instructor.create(objeto);
    res.json({
      status: 'success',
      data: {
        instructor: nuevoInstructor,
      },
    });
  } catch (err) {
    res.json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.mostrarInstructor = async (req, res) => {
  try {
    let instructoresTemplate = template;
    let instructor = await Instructor.findOne({ ide: req.params.ide });

    console.log(instructor);

    instructoresTemplate = instructoresTemplate.replace(
      '${ide}',
      instructor.ide
    );
    if (instructor.estado == true) {
      instructoresTemplate = instructoresTemplate.replace(
        '${checked}',
        'checked'
      );
    }
    if (instructor.estado) {
      instructoresTemplate = instructoresTemplate.replace(
        '${estado}',
        'Activo'
      );
    } else {
      instructoresTemplate = instructoresTemplate.replace(
        '${estado}',
        'Inactivo'
      );
    }
    instructoresTemplate = instructoresTemplate.replace(
      '${nombres}',
      instructor.nombres
    );
    instructoresTemplate = instructoresTemplate.replace(
      '${apellidos}',
      instructor.apellidos
    );
    instructoresTemplate = instructoresTemplate.replace(
      '${ide}',
      instructor.ide
    );
    instructoresTemplate = instructoresTemplate.replace(
      '${cursos}',
      instructor.cursos[0]
    );
    instructoresTemplate = instructoresTemplate.replace(
      '${profTitulo}',
      instructor.profTitulo
    );
    instructoresTemplate = instructoresTemplate.replace(
      '${email}',
      instructor.email
    );
    instructoresTemplate = instructoresTemplate.replace(
      '${domicilio}',
      instructor.domicilio
    );
    instructoresTemplate = instructoresTemplate.replace(
      '${telefono}',
      instructor.telefono
    );

    res.send(instructoresTemplate);
  } catch (err) {
    res.json({
      status: 'fail',
      message: 'Template no se pudo cargar!',
    });
  }
};

exports.actualizarInstructor = async (req, res) => {
  try {
    let instructor = await Instructor.updateOne(
      { ide: req.params.ide },
      req.body,
      {
        new: true,
      }
    );

    console.log(instructor);
    res.json({
      status: 'success - actualizado',
      data: { instructor },
    });
  } catch (err) {
    res.json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.desactivarInstructor = async (req, res) => {
  try {
    let instructor = await Instructor.updateOne(
      { ide: req.params.ide },
      { estado: false },
      {
        new: true,
      }
    );

    console.log(instructor);
    res.json({
      status: 'success - desactivado',
      data: {
        instructor,
      },
    });
  } catch (err) {
    res.json({
      status: 'fail',
      message: err.message,
    });
  }
};
