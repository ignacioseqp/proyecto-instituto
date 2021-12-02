const { request, response } = require('express');
// const { validarJWT } = require('./validar-jwt');

const esAdminRole = (req = request, res = response, next) => {
  if (!req.usuario) {
    console.log('Se quiere verificar el role sin validar el token primero');
    return res.status(500).json({
      msg: 'Se quiere verificar el role sin validar el token primero',
    });
  }

  const { rol, nombre } = req.usuario;

  if (rol !== 'ADMIN_ROLE') {
    console.log('No es administrador');
    return res.status(401).json({
      msg: 'No es administrador',
    });
  }

  next();
};

const tieneRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: 'Se quiere verificar el role sin validar el token primero',
      });
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`,
      });
    }

    next();
  };
};

module.exports = { esAdminRole, tieneRole };
