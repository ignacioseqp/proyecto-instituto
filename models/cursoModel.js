const { Schema, model } = require('mongoose');
// const Usuario = require('../models/usuario');

const cursoSchema = new Schema(
  {
    ide: {
      type: Number,
      required: true,
      unique: true,
    },
    nombre: {
      type: String,
      required: [true, 'El nombre del curso es obligatorio!'],
    },
    estado: {
      type: Boolean,
      required: [true, 'El estado del curso es obligatorio!'],
    },
    usuario: {
      type: Schema.Types.ObjectId,
      href: 'Usuario',
      required: true,
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
    instructores: [{ type: Schema.Types.ObjectId, ref: 'Instructore' }],
    alumnos: [{ type: Schema.Types.ObjectId, ref: 'Alumno' }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Curso = model('Curso', cursoSchema);

module.exports = Curso;
