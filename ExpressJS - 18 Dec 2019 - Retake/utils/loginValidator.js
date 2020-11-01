const {errorLogin, errorRegister} = require('../config/messages')()

module.exports = (req, res, next) => {
    let errors = {};
    if (!req.body.email) {
        errors['errorUsername'] = {properties: {message: errorRegister.email}}
    }
    if (!req.body.password) {
        errors['errorPassword'] = {properties: {message: errorLogin.password}}
    }
    if (Object.keys(errors).length > 0) {
        let msg = {
            _message: "Login validation failed",
            errors
        };
        return next(msg)
    }
    next();
};
