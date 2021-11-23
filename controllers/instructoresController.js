const fs = require('fs');
const Instructor = require('./../models/instructorModel');

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
        alumno: nuevoInstructor,
      },
    });
  } catch (err) {
    res.json({
      status: 'fail',
      message: err.message,
    });
  }
};
