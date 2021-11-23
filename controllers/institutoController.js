const Alumno = require('./../models/alumnoModel');
const Instructor = require('./../models/instructorModel');
const Curso = require('./../models/cursoModel');
const apiOpciones = require('../apiOpciones');

const fs = require('fs');

let mainTemplate = fs.readFileSync('templates/index.html', 'utf-8');

exports.mostrarTodo = async (req, res) => {
  try {
    let queryAlu = await Alumno.find().sort({ ide: 1 });
    let queryIns = await Instructor.find().sort({ ide: 1 });
    let queryCur = await Curso.find().sort({ ide: 1 });

    const aluHtml = queryAlu
      .map((alu) => {
        return `<tr>
      <td><a href="/alumnos/${alu.ide}" 
      style="text-decoration: none">${alu.ide}</a></td>
      <td>${alu.apellidos}</td>
      <td>${alu.nombres}</td>
      <td>${alu.documentoTipo}</td>
      <td>${alu.documentoNro}</td>
      <td>${alu.email}</td>
      <td>${alu.domicilio}</td>
      <td>${alu.telefono}</td>
    </tr>`;
      })
      .join('');

    mainTemplate = mainTemplate.replace('${alumnos}', aluHtml);

    const cursoHtml = queryCur
      .map((curso) => {
        let estado = 'Activo';
        if (curso.estado == false) {
          estado = 'Inactivo';
        }
        return `<tr>
        <td><a href="/cursos/${curso.ide}" 
        style="text-decoration: none">${curso.ide}</a></td>
        <td>${curso.nombre}</td>
        <td>${estado}</td>
        <td>${curso.fechaDesde}</td>
        <td>${curso.fechaHasta}</td>
        <td>${curso.instructores.length}</td>
        <td>${curso.alumnos.length}</td>
      </tr>`;
      })
      .join('');
    mainTemplate = mainTemplate.replace('${cursos}', cursoHtml);

    const instrHtml = queryIns
      .map((instr) => {
        return `<tr>
    <td><a href="/instructores/${instr.ide}" 
    style="text-decoration: none">${instr.ide}</a></td>
    <td>${instr.apellidos}</td>
    <td>${instr.nombres}</td>
    <td>${instr.profTitulo}</td>
    <td>${instr.email}</td>
    <td>${instr.domicilio}</td>
    <td>${instr.telefono}</td>
  </tr>`;
      })
      .join('');
    mainTemplate = mainTemplate.replace('${instructores}', instrHtml);

    res.send(mainTemplate);
  } catch (err) {
    res.json({
      status: 'fail',
      message: 'Error de datos!',
    });
  }
};
