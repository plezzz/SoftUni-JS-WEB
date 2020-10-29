const {cookie} = require('../config')
const {verifyToken} = require('./jwt')
const {User} = require('../models')

module.exports = (req, res, next) => {
    const token = req.cookies[cookie] || '';

    if (!token) {
        next()
        return;
    }

    verifyToken(token)
        .then(({_id}) => User.findOne({_id}))
        .then(({email, fullName, _id}) => {
            req.user = {email, fullName, _id};
            res.locals.isLogged = Boolean(req.user);
            res.locals.fullName = fullName;
            res.locals.email = email;
          //  res.locals.id = _id;
            next();
        })
        .catch(next)
};
