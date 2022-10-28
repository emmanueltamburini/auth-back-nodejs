const { Router } = require('express');
const { createUser, renew, login } = require('../controllers/auth.controller');

const router = Router();

router.post('/user', createUser);

router.post('/', login);

router.get('/renew', renew);

module.exports = router;