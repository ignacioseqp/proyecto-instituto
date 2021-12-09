const mongoose = require('mongoose');

const alumnoSchema = new mongoose.Schema(
  {
    ide: {
      type: Number,
      required: true,
      unique: true,
    },
    estado: {
      type: Boolean,
      required: [true, 'El estado del curso es obligatorio!'],
    },
    apellidos: {
      type: String,
      required: [true, 'El apellido del alumno es obligatorio!'], //default: "false", puede ir "true", o un arreglo de 2 elementos: "[true, 'asdwqfafsd']"
    },
    nombres: {
      type: String,
      required: [true, 'El nombre del alumno es obligatorio!'],
    },
    img: {
      type: String,
    },
    documentoTipo: {
      type: String,
      required: [true, 'El tipo de documento es obligatorio!'],
    },
    documentoNro: {
      type: Number,
      required: [true, 'El numero de documento es obligatorio!'],
      unique: true,
    },
    cursos: {
      type: [String],
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

const Alumno = mongoose.model('Alumno', alumnoSchema);

module.exports = Alumno;
