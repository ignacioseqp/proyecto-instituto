const { request, response } = require('express');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
// cloudinary.config(process.env.CLOUDINARY_URL);
cloudinary.config({
  cloud_name: 'web-nube-pruebas',
  api_key: '399185153512733',
  api_secret: 'OWGeTE20jXSKIzc4J4kM5mpcICA',
});

const { subirArchivo } = require('../helpers/subir-archivo');
const { Instructor, Alumno } = require('../models');

const uploadArchivo = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).send('No hay archivos para subir.');
    return;
  }

  //Imagenes
  const nombre = await subirArchivo(req.files);

  res.json({
    nombre,
  });
};

const actualizarArchivo = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case 'instructores':
      modelo = await Instructor.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un instructor con el id ${id}`,
        });
      }
      break;
    case 'alumnos':
      modelo = await Alumno.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un alumno con el id ${id}`,
        });
      }
      break;
    default:
      return res.status(500).json({ msg: 'Se olvido validar esto' });
  }

  const nombre = await subirArchivo(req.files, undefined, coleccion);

  //si existe imagen borrarla
  if (modelo.img) {
    const pathImagen = path.join(
      __dirname,
      '../uploads/',
      coleccion,
      modelo.img
    );
    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }

  modelo.img = nombre;

  await modelo.save();

  res.json({ id, coleccion, modelo });
};

const actualizarImagenClaudinary = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case 'instructores':
      modelo = await Instructor.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un instructor con el id ${id}`,
        });
      }
      break;
    case 'alumnos':
      modelo = await Alumno.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un alumno con el id ${id}`,
        });
      }
      break;
    default:
      return res.status(500).json({ msg: 'Se olvido validar esto' });
  }

  try {
    //si existe imagen borrarla
    if (modelo.img) {
      const nombreArr = modelo.img.split('/');
      const nombreArrArchivo = nombreArr[nombreArr.length - 1];
      const [public_id] = nombreArrArchivo.split('.');

      await cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    modelo.img = secure_url;
    await modelo.save();

    res.json({ modelo });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};

module.exports = {
  uploadArchivo,
  actualizarArchivo,
  actualizarImagenClaudinary,
};
