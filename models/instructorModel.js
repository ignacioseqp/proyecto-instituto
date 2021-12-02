const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema(
  {
    ide: {
      type: Number,
      required: true,
      unique: true,
    },
    apellidos: {
      type: String,
      required: [true, 'El apellido del alumno es obligatorio!'], //default: "false", puede ir "true", o un arreglo de 2 elementos: "[true, 'asdwqfafsd']"
    },
    nombres: {
      type: String,
      required: [true, 'El nombre del alumno es obligatorio!'],
    },
    cursos: {
      type: [String],
    },
    profTitulo: {
      type: String,
      required: [true, 'La profesion o titulo es obligatorio!'],
    },
    email: {
      type: String,
      required: [true, 'El e-mail es obligatorio!'],
      unique: true,
    },
    domicilio: {
      type: String,
      required: [true, 'El domicilio es obligatorio!'],
    },
    telefono: {
      type: Number,
      required: [true, 'El numero de teléfono es obligaroio!'],
      unique: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Instructor = mongoose.model('Instructore', instructorSchema);

module.exports = Instructor;
