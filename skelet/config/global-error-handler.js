const { cookie } = require('./');

module.exports = function globalErrorHandler(err, req, res, next) {
    console.log(err)
    let message = 'SERVER ERROR';
    if (res.locals.validationErrorViewName) {
        res.render(res.locals.validationErrorViewName, { errors: err, ...req.body });
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
    res.render('error/error', { message });
};
