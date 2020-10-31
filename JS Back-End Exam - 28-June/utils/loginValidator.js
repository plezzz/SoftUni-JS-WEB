const {errorRegister} = require('../config/messages')()

module.exports = (req, res, next) => {
    let errors = {};
    if (!req.body.username) {
        errors['errorUsername'] = {properties: {message: errorRegister.username}}
    }
    if (!req.body.password) {
        errors['errorPassword'] = {properties: {message: errorRegister.password}}
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
