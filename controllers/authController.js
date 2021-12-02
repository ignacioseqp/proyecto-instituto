const fs = require('fs');
const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generarJwt');
const { googleVerify } = require('../helpers/google-verify');

let template = fs.readFileSync('templates/loginGoogle.html', 'utf-8');

exports.google = async (req, res) => {
  try {
    let googleTemplate = template;

    res.send(googleTemplate);
  } catch (err) {}
};

exports.login = async (req = request, res = response) => {
  try {
    // correo
    const { correo, password } = req.body;
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ msg: 'No existe el usuario!' });
    }

    // estado
    if (!usuario.estado) {
      return res.status(400).json({ msg: 'El usuario no esta activo!' });
    }

    // contraseña
    const valid = bcryptjs.compareSync(password, usuario.password);
    if (!valid) {
      return res.status(400).json({ msg: 'Contraseña incorrecta!' });
    }

    // generar token
    const token = await generarJWT(usuario.id);

    console.log(usuario, token);
    res.json({ usuario, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      log: error,
      msg: 'Hable con el administrador!',
    });
  }
};

exports.googleSignin = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const { nombre, img, correo } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      usuario = new Usuario({
        nombre,
        correo,
        rol: 'USER_ROLE',
        password: 'NO_IMPORTA',
        img,
        google: true,
      });
      await usuario.save();
    }

    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Usuario deshabilitado, hablar con el administrador!',
      });
    }

    // generar el token
    const token = await generarJWT(usuario.id);
    console.log('JWT token: ', token);

    res.status(200).json({
      msg: 'Todo OK',
      usuario,
      token,
    });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

// exports.login = async (req, res = response) => {
//   const { correo, password } = req.body;

//   try {
//     //Email existe?
//     const usuario = await Usuario.findOne({ correo });
//     if (!usuario) {
//       return res.status(400).json({
//         msg: 'Datos ingresados incorrectos',
//       });
//     }

//     // Usuario está activo?
//     if (!usuario.estado) {
//       return res.status(400).json({
//         msg: 'Datos incorrectos (estado: false)',
//       });
//     }

//     // Contraseña coincide?
//     const passwordValida = bcryptjs.compareSync(password, usuario.password);
//     if (!passwordValida) {
//       return res.status(400).json({
//         msg: 'Contraseña incorrecta',
//       });
//     }

//     // Generar el JWT
//     const token = await generarJWT(usuario.id);

//     res.json({
//       usuario,
//       token,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       msg: 'Hable con el administrador',
//     });
//   }
// };

// exports.googleSignin = async (req, res = response) => {
//   const { id_token } = req.body;

//   try {
//     const googleUser = await googleVerify(id_token);

//     console.log(googleUser);

//     res.json({
//       msg: 'Todo ok google.',
//       id_token,
//     });
//   } catch (err) {
//     console.log(err);
//     json.status(400).json({
//       ok: false,
//       msg: 'El token no se pudo verificar',
//     });
//   }
// };
