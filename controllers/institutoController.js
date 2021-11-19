const Alumno = require('./../models/alumnoModel');
const Instructor = require('./../models/instructorModel');
const Curso = require('./../models/cursoModel');
const apiOpciones = require('../apiOpciones');

const fs = require('fs');

let mainTemplate = fs.readFileSync('templates/index.html', 'utf-8');

exports.mostrarTodo = async (req, res) => {
  try {
    let queryAlu = await Alumno.find();
    let queryIns = await Instructor.find();
    let queryCur = await Curso.find();

    const aluHtml = queryAlu
      .map((alu) => {
        return `<tr>
      <td>${alu.ide}</td>
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
        return `<tr>
        <td>${curso.ide}</td>
        <td>${curso.nombre}</td>
        <td>${curso.estado}</td>
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
    <td>${instr.ide}</td>
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
