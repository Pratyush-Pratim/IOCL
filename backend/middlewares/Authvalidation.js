const Joi = require('joi');
const jwt = require('jsonwebtoken');

const signUpValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(100).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: "Bad Request", error });
    next();
};

const LoginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(100).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: "Bad Request", error });
    next();
};

const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(403).json({ message: 'Unauthorized, JWT token is required' });
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Unauthorized, JWT token wrong or expired' });
    }
};


module.exports = {
    signUpValidation,
    LoginValidation,
    ensureAuthenticated
};