const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');

const Alumno = require('../models/alumnoModel');
const Instructor = require('../models/instructorModel');
const Curso = require('../models/cursoModel');

dotenv.config({ path: './config.env' });
const puerto = process.env.PORT || 3000;

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const eliminarTodo = async () => {
  try {
    const cursos = await Curso.deleteMany();
    const instructores = await Instructor.deleteMany();
    const alumnos = await Alumno.deleteMany();
  } catch (err) {
    console.error(err.message);
  }
  process.exit();
};

const importarDesde = async (file) => {
  try {
    const alumnosJson = JSON.parse(
      fs.readFileSync(`./dev-data/${file}`, 'utf-8')
    );

    await Alumno.create(alumnosJson.alumnos);
    await Curso.create(alumnosJson.cursos);
    await Instructor.create(alumnosJson.instructores);

    console.log(`Importando desde ${file}`);
  } catch (err) {
    console.error(err.message);
  }
  process.exit();
};

const exportarA = async (file) => {
  try {
    const todosLosAlu = await Alumno.aggregate([
      {
        $project: {
          __v: 0,
        },
      },
    ]);
    const todosLosInstr = await Instructor.aggregate([
      {
        $project: {
          __v: 0,
        },
      },
    ]);
    const todosLosCur = await Curso.aggregate([
      {
        $project: {
          __v: 0,
        },
      },
    ]);

    let institutoJson = {
      alumnos: todosLosAlu,
      cursos: todosLosCur,
      instructores: todosLosInstr,
    };
    fs.writeFileSync(`./dev-data/${file}`, JSON.stringify(institutoJson));
  } catch (err) {
    console.error(err.message);
  }
  process.exit();
};

mongoose
  .connect(
    DB,
    // process.env.DATABASE_LOCAL,
    {
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Connection successful!');
    console.log(process.argv, process.argv.length);

    if (process.argv[2] === '--importar') {
      console.log('Importar desde archivo JSON');
      const file = process.argv[3] ? process.argv[3] : 'import.json';
      importarDesde(file);
    } else if (process.argv[2] === '--borrar') {
      console.log('Se eliminaron los datos de la base de datos!');
      eliminarTodo();
    } else if (process.argv[2] === '--exportar') {
      console.log('Exportar al archivo JSON');
      const file = process.argv[3] ? process.argv[3] : 'export.json';
      exportarA(file);
    }

    // process.exit();
  })
  .catch((err) => {
    console.log(err);
  });
