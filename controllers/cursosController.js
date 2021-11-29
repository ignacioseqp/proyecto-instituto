const Curso = require('./../models/cursoModel');
const Alumno = require('./../models/alumnoModel');
const Instructor = require('./../models/instructorModel');

const fs = require('fs');

let template = fs.readFileSync('templates/cursos.html', 'utf-8');

exports.crearCurso = async (req, res) => {
  try {
    let query = await Curso.find().sort({ ide: 1 });
    const nuevoId = query[query.length - 1].ide + 1;

    const objeto = {
      ide: nuevoId,
      nombre: req.body.nombre,
      estado: false,
      fechaDesde: req.body.fechaDesde,
      fechaHasta: req.body.fechaHasta,
      horarios: req.body.horarios,
      instructores: [],
      alumnos: [],
    };

    const nuevoCurso = await Curso.create(objeto);
    console.log(nuevoCurso);
    res.json({
      status: 'success',
      data: {
        curso: nuevoCurso,
      },
    });
  } catch (err) {
    res.json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.mostrarCurso = async (req, res) => {
  try {
    let cursosTemplate = template;
    let queryAlu = await Alumno.find();
    let queryInstr = await Instructor.find();
    let curso = await Curso.findOne({ ide: req.params.ide });

    let desdeAño = curso.fechaDesde.slice(0, 4);
    let desdeMes = curso.fechaDesde.slice(5, 7);
    let desdeDia = curso.fechaDesde.slice(8, 10);
    let hastaAño = curso.fechaHasta.slice(0, 4);
    let hastaMes = curso.fechaHasta.slice(5, 7);
    let hastaDia = curso.fechaHasta.slice(8, 10);

    cursosTemplate = cursosTemplate.replace('${curso}', curso.nombre);
    cursosTemplate = cursosTemplate.replace('${ide}', curso.ide);
    cursosTemplate = cursosTemplate.replace('${ide}', curso.ide);
    if (curso.estado == true) {
      cursosTemplate = cursosTemplate.replace('${checked}', 'checked');
    }
    cursosTemplate = cursosTemplate.replace('${nombre}', curso.nombre);
    cursosTemplate = cursosTemplate.replace('${desdeDia}', desdeDia);
    cursosTemplate = cursosTemplate.replace('${desdeMes}', desdeMes);
    cursosTemplate = cursosTemplate.replace('${desdeAño}', desdeAño);
    cursosTemplate = cursosTemplate.replace('${hastaDia}', hastaDia);
    cursosTemplate = cursosTemplate.replace('${hastaMes}', hastaMes);
    cursosTemplate = cursosTemplate.replace('${hastaAño}', hastaAño);

    if (curso.estado == false) {
      cursosTemplate = cursosTemplate.replace('${estado}', 'Inactivo');
    } else {
      cursosTemplate = cursosTemplate.replace('${estado}', 'Activo');
    }

    const horarios = `<tr>
      <th scope="row">Desde</td>
      <td>${curso.horarios[0].desdeHora}</td>
      <td>${curso.horarios[1].desdeHora}</td>
      <td>${curso.horarios[2].desdeHora}</td>
      <td>${curso.horarios[3].desdeHora}</td>
      <td>${curso.horarios[4].desdeHora}</td>
    </tr>
    <tr>
      <th scope="row">Hasta</td>
      <td>${curso.horarios[0].hastaHora}</td>
      <td>${curso.horarios[1].hastaHora}</td>
      <td>${curso.horarios[2].hastaHora}</td>
      <td>${curso.horarios[3].hastaHora}</td>
      <td>${curso.horarios[4].hastaHora}</td>
    </tr>`;

    cursosTemplate = cursosTemplate.replace('${horarios}', horarios);

    const cursoInstructores = curso.instructores
      .map((ins) => {
        return `<tr>
      <td><a href="/instructores/${ins}" 
      style="text-decoration: none">${ins}</a></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>`;
      })
      .join('');
    cursosTemplate = cursosTemplate.replace(
      '${instructores}',
      cursoInstructores
    );

    const cursoAlumnos = curso.alumnos
      .map((alu) => {
        return `<tr>
      <td><a href="/alumnos/${alu}" 
      style="text-decoration: none">${alu}</a></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>`;
      })
      .join('');
    cursosTemplate = cursosTemplate.replace('${alumnos}', cursoAlumnos);

    res.send(cursosTemplate);
  } catch (err) {
    res.json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.actualizarCurso = async (req, res) => {
  try {
    let curso = await Curso.updateOne({ ide: req.params.ide }, req.body, {
      new: true,
    });

    console.log(curso);
    res.json({
      status: 'success',
      data: {
        curso,
      },
    });
  } catch (err) {
    res.json({
      status: 'fail',
      message: err.message,
    });
  }
};
