const { request, response } = require('express');
const { Curso, Instructor, Alumno, Usuario } = require('../models');

const coleccionesPermitidas = ['usuario', 'curso', 'instructor', 'alumno'];

const buscarPorCurso = async (res, termino) => {
  const regexp = new RegExp(termino, 'i');

  const cur = await Curso.find({ $or: [{ nombre: regexp }] });
  console.log('EN LA BUSQUEDA', termino, cur);

  if (cur.length == 0) {
    return res.json({
      msg: 'No existe curso con ese nombre',
    });
  }

  res.json({
    resultado: cur,
  });
};

exports.buscar = (req = request, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitidas}!`,
    });
  }

  switch (coleccion) {
    case 'curso':
      return buscarPorCurso(res, termino);
      break;
    case 'instructor':
      break;
    case 'alumno':
      break;
    case 'usuario':
      break;
    default:
      res.status(500).json({
        msg: 'No se ha implementado, aún, esa búsqueda!',
      });
      break;
  }

  res.json({
    msg: `Buscando ${coleccion}, ${termino}`,
  });
};
