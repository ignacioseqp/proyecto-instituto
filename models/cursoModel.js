const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del curso es obligatorio!'],
    },
    estado: {
      type: Boolean,
      required: [true, 'El estado del curso es obligatorio!'],
    },
    fechaDesde: {
      type: String,
      required: [true, 'La fecha de inicio del curso es obligatoria!'],
    },
    fechaHasta: {
      type: String,
      required: [true, 'La fecha de finalización del curso es obligatoria!'],
    },
    horarios: {
      type: [Object],
    },
    instructores: {
      type: [Number],
    },
    alumnos: {
      type: [Number],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Curso = mongoose.model('Curso', cursoSchema);

module.exports = Curso;
