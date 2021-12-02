const { Curso, Alumno, Instructor } = require('../models');

const fs = require('fs');

let template = fs.readFileSync('templates/cursos.html', 'utf-8');

exports.crearCurso = async (req, res) => {
  try {
    let query = await Curso.find();
    console.log(query.length);
    const nuevoId = query.length + 1;
    console.log(nuevoId);

    const nombre = req.body.nombre;
    const cursoDB = await Curso.findOne({ nombre });
    if (cursoDB) {
      return res.status(400).json({
        msg: 'Ya existe un curso con ese nombre',
      });
    }
    let instructoresCurso = await Instructor.find({ cursos: req.body.nombre });
    let alumnosCurso = await Alumno.find({ cursos: req.body.nombre });

    const objeto = {
      ide: nuevoId,
      usuario: req.usuario,
      nombre: req.body.nombre,
      estado: false,
      fechaDesde: req.body.fechaDesde,
      fechaHasta: req.body.fechaHasta,
      horarios: req.body.horarios,
      instructores: instructoresCurso,
      alumnos: alumnosCurso,
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

    let curso = await Curso.findOne({ ide: req.params.ide })
      .populate({
        path: 'instructores',
        select: ['ide', 'nombres', 'apellidos'],
        options: { sort: { ide: 1 } },
      })
      .populate({
        path: 'alumnos',
        select: ['ide', 'nombres', 'apellidos'],
        options: { sort: { ide: 1 } },
      });

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
        <td><a href="/instructores/${ins.ide}"
        style="text-decoration: none">${ins.ide}</a></td>
        <td>${ins.nombres}</td>
        <td>${ins.apellidos}</td>
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
        <td><a href="/alumnos/${alu.ide}"
        style="text-decoration: none">${alu.ide}</a></td>
        <td>${alu.nombres}</td>
        <td>${alu.apellidos}</td>
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
      status: 'success - actualizado',
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

exports.desactivarCurso = async (req, res) => {
  try {
    let curso = await Curso.updateOne(
      { ide: req.params.ide },
      { estado: false },
      {
        new: true,
      }
    );

    console.log(curso);
    res.json({
      status: 'success - desactivado',
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

//POPULATE

// exports.mostrarCurso = async (req, res) => {
//   try {
//     let curso = await Curso.findOne({ ide: req.params.ide })
//       .populate('instructores')
//       .populate('alumnos', ['ide', 'nombres', 'apellidos']);

//     curso.alumnos.forEach((alu) => {
//       console.log(alu.nombres);
//     });

//     res.json({
//       curso,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       msg: err,
//     });
//   }
// }
