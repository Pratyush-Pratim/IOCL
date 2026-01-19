const express = require('express');
const { signUpValidation, LoginValidation } = require('../middlewares/Authvalidation');
const { signup, login } = require('../controllers/AuthCotroller');
const router = express.Router();

router.post('/login', LoginValidation,login);

router.post('/signup', signUpValidation,signup);

module.exports = router;