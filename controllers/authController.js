const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generarJwt');

exports.login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    //Email existe?
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: 'Datos ingresados incorrectos',
      });
    }

    // Usuario está activo?
    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'Datos incorrectos (estado: false)',
      });
    }

    // Contraseña coincide?
    const passwordValida = bcryptjs.compareSync(password, usuario.password);
    if (!passwordValida) {
      return res.status(400).json({
        msg: 'Contraseña incorrecta',
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hable con el administrador',
    });
  }
};
