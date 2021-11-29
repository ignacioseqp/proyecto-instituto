const fs = require('fs');
const Instructor = require('./../models/instructorModel');

let template = fs.readFileSync('templates/instructores.html', 'utf-8');

exports.crearInstructor = async (req, res) => {
  try {
    let query = await Instructor.find().sort({ ide: 1 });
    const nuevoId = query[query.length - 1].ide + 1;

    const objeto = {
      ide: nuevoId,
      apellidos: req.body.apellidos,
      nombres: req.body.nombres,
      profTitulo: req.body.profTitulo,
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
    const instructor = await Instructor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json({
      status: 'success',
      data: instructor,
    });
  } catch (err) {
    res.json({
      status: 'fail',
      data: 'Datos incorrectos!',
    });
  }
};

exports.eliminarInstructor = async (req, res) => {
  try {
    await Instructor.findByIdAndDelete(req.params.id);

    res.json({
      status: 'success',
      data: 'instructor eliminado',
    });
  } catch (err) {
    res.json({
      status: 'success',
      data: 'Datos incorrectos!',
    });
  }
};
