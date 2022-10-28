const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, renew, login } = require('../controllers/auth.controller');

const router = Router();

router.post('/user', createUser);

router.post('/', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({min: 6}),
], login);

router.get('/renew', renew);

module.exports = router;