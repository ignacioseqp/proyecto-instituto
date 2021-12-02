const express = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {
  login,
  googleSignin,
  google,
} = require('../controllers/authController');
// const {  } = require('../controllers/googleSignin');

const router = express.Router();

router.post(
  '/',
  [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  login
);

router.post(
  '/googlesignin',
  [check('id_token', 'id_token es necesario!').not().isEmpty(), validarCampos],
  googleSignin
);

router.get('/', google);

module.exports = router;
