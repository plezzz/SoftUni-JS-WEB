const {cookie} = require('./');
const {errorLogin} = require('../config/messages')()

module.exports = function globalErrorHandler(err, req, res, next) {
    let message = [err] || ['SERVER ERROR'];
    if (res.locals.validationErrorViewName) {
        res.render(res.locals.validationErrorViewName, {errors: err, ...req.body});
        return;
    }
    if (err.message === 'BAD_REQUEST') {
        message = 'Bad Request!';
    } else if (err.message === 'UNAUTHORIZED') {
        message = 'You don\'t have permission to view this';
    }

    if (['jwt malformed'].includes(err.message)) {
        res.clearCookie(cookie);
        res.redirect('user/login');
        return;
    }

    if (Object.values(errorLogin).includes(err.message)) {
        render('user/login', message, true)
        return;
    }

    if (err._message === 'Login validation failed') {
        let messages = normalizeErrors(err.errors)
        render('user/login', messages, true)
        return;
    }

    if (err._message === 'Course validation failed' || err._message === 'Validation failed') {
        let messages = normalizeErrors(err.errors)
        render('course/create', messages, true)
        return;
    }
    if (err._message === 'User validation failed') {
        let messages = normalizeErrors(err.errors)
        render('user/register', messages, true)
        return;
    }

    function normalizeErrors(errors) {
        let messages = [];
        Object.values(errors).forEach(error => {
            messages.push(error.properties.message)
        });
        return messages
    }

    function render(path, message, obj = null) {
        obj ? obj = req.body : null;
        res.render(path, {message, obj});
    }

    res.render('error/error', {message});
};
