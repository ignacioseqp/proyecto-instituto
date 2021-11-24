const express = require('express');
const { check } = require('express-validator');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
const {
  validarCampos,
  validarJWT,
  esAdminRole,
  tieneRole,
} = require('../middlewares');

const {
  esRoleValido,
  emailExiste,
  usuarioExistePorId,
} = require('../helpers/db-validators');

const {
  getUsuarios,
  postUsuario,
  putUsuario,
  patchUsuario,
  deleteUsuario,
} = require('../controllers/usuarios');

const router = express.Router();

router.get('/', getUsuarios);
router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido!').isEmail(),
    check(
      'password',
      'El password es obligatorio y debe tener un mínimo d de 6 caracteres!'
    ).isLength({ min: 6 }),
    check('rol', 'El rol no es valido!').isIn([
      'ADMIN_ROLE',
      'USER_ROLE',
      'VENTAS_ROLE',
    ]),
    check('rol').custom(esRoleValido),
    check('correo').custom(emailExiste),
    validarCampos,
  ],
  postUsuario
);
router.put(
  '/:id',
  [
    check('id', 'No es un ID válido!').isMongoId(),
    check('id').custom(usuarioExistePorId),
    check('rol').custom(esRoleValido),
    validarCampos,
  ],
  putUsuario
);
router.patch('/:id', patchUsuario);
router.delete(
  '/:id',
  [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID válido!').isMongoId(),
    check('id').custom(usuarioExistePorId),
    validarCampos,
  ],
  deleteUsuario
);

module.exports = router;
