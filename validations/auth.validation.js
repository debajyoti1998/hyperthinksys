const Joi = require('joi');

const registerValidation = {
    body : Joi.object({
        name: Joi.string().required().max(50).regex(/^[a-zA-Z0-9. ]*$/, 'Alphanumerics, space and dot characters'),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(12).required(),
    })
}

const loginValidation = {
    body : Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(12).required(),
    })
}

module.exports = {
    registerValidation,
    loginValidation,
};