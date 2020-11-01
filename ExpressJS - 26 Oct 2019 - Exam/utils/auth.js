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
        .then(({username, _id}) => {
            req.user = {username, _id};
            res.locals.isLogged = Boolean(req.user);
            res.locals.username = username;
            next();
        })
        .catch(next)
};
