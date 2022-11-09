const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, renew, login } = require('../controllers/auth.controller');
const { validateField } = require('../middlewares/validate-fields.middlewares');
const { validateJWT } = require('../middlewares/validate-jwt.middleware');

const router = Router();

router.post('/user', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({min: 6}),
    validateField
], createUser);

router.post('/', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({min: 6}),
    validateField
], login);

router.get('/renew', validateJWT, renew);

module.exports = router;