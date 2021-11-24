const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const getUsuarios = async (req = request, res = response) => {
  const { limit = 10, skip = 0 } = req.query;
  const usuariosPromise = Usuario.find({ estado: true })
    .limit(Number(limit))
    .skip(Number(skip));

  const cantidadPromise = Usuario.countDocuments({ estado: true });

  const [cantidad, usuarios] = await Promise.all([
    cantidadPromise,
    usuariosPromise,
  ]);

  res.json({ limit, skip, cantidad, usuarios });
};

const postUsuario = async (req = request, res = response) => {
  try {
    const { nombre, correo, password, rol } = req.body;

    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
      return res.status(401).json({
        msg: 'El correo ya existe!',
      });
    }

    const usuario = new Usuario({
      nombre: nombre,
      correo: correo,
      password: password,
      rol: rol,
    });

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({ usuario });
  } catch (error) {
    console.log(error);
    throw new Error('Error guardando el usuario!');
  }
};

const putUsuario = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, password, correo, google, ...resto } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json({ usuario });
};

const patchUsuario = (req, res = response) => {
  res.json({ msg: 'patch API' });
};

const deleteUsuario = async (req, res = response) => {
  const { id } = req.params;

  // const usuario = await Usuario.findByIdAndDelete(id);
  const usuario = await Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json(usuario);
};

module.exports = {
  getUsuarios,
  postUsuario,
  putUsuario,
  patchUsuario,
  deleteUsuario,
};
