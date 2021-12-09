const Alumno = require('./../models/alumnoModel');
const Instructor = require('./../models/instructorModel');
const Curso = require('./../models/cursoModel');
const apiOpciones = require('../apiOpciones');

const fs = require('fs');

let template = fs.readFileSync('templates/index.html', 'utf-8');

exports.mostrarTodo = async (req, res) => {
  try {
    let mainTemplate = template;
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

    let cursoHtml = await Promise.all(
      queryCur.map(async (curso) => {
        try {
          curso.instructores = await Instructor.find({
            cursos: curso.nombre,
            estado: true,
          });
          curso.alumnos = await Alumno.find({
            cursos: curso.nombre,
            estado: true,
          });
          let estado = 'Activo';
          if (curso.estado == false) {
            estado = 'Inactivo';
          }
          return `<tr>
          <td><a href="/cursos/${curso.ide}" 
          style="text-decoration: none">${curso.ide}</a></td>
          <td>${curso.nombre}</td>
          <td>${estado}</td>
          <td>${curso.fechaDesde[0]}/${curso.fechaDesde[1]}/${curso.fechaDesde[2]}</td>
          <td>${curso.fechaHasta[0]}/${curso.fechaHasta[1]}/${curso.fechaHasta[2]}</td>
          <td>${curso.instructores.length}</td>
          <td>${curso.alumnos.length}</td>
        </tr>`;
        } catch (err) {
          return console.log(err);
        }
      })
    );

    cursoHtml = cursoHtml
      .map((cur) => {
        return cur;
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

    const cursosSelec = queryCur
      .map((cur) => {
        return `<option value="${cur.nombre}">${cur.nombre}</option>`;
      })
      .join('');

    mainTemplate = mainTemplate.replace('${cursosSelec}', cursosSelec);
    mainTemplate = mainTemplate.replace('${cursosSelec}', cursosSelec);

    res.send(mainTemplate);
  } catch (err) {
    res.json({
      status: 'fail',
      message: 'Error de datos!' + err,
    });
  }
};
