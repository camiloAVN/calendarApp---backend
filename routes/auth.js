// rutas de usuario / auth
// host + /api/auth

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {crearUsuario, loginUsuario, renewToken} = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const { authLimiter } = require('../middlewares/rate-limit');
const router = Router();


//rutas
router.post('/new', 
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de al menos 6 caracteres').isLength({ min: 6 }),
        validarCampos
],
crearUsuario)

router.post('/',authLimiter, [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser de al menos 6 caracteres').isLength({ min: 6 }),
    validarCampos
], loginUsuario )

router.get('/renew', validarJWT, renewToken)


module.exports = router;