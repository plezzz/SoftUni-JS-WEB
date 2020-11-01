const {User} = require('../models');
const {jwt} = require('../utils');
const {cookie} = require('../config');
const {errorLogin} = require('../config/messages')()

let templateDir = (doc) => {
    return `./user/${doc}`
};

module.exports = {
    get: {
        login(req, res) {
            res.render(templateDir('login'))
        },
        register(req, res) {
            res.render(templateDir('register'))
        },
        logout(req, res) {
            res
                .clearCookie(cookie)
                .redirect('/login')
        }
    },
    post: {
        register(req, res, next) {
            const {username, password, repeatPassword} = {...req.body};
            User.create({username, password, repeatPassword})
                .then((user) => {
                    const token = jwt.createToken(user._id);

                    res.cookie(cookie, token, {maxAge: 3600000})
                    res.redirect('/home');
                })
                .catch(next)
        },
        login(req, res, next) {
            const {username, password} = {...req.body};

            User.findOne({username})
                .then((user) => {
                    return Promise.all([
                        user ? user.comparePasswords(password, next) : false,
                        user
                    ])
                })
                .then(([isPasswordMatched, user]) => {
                    if (!isPasswordMatched) {
                        throw new Error(errorLogin.password)
                    }

                    const token = jwt.createToken(user._id);

                    res.cookie(cookie, token, {maxAge: 3600000})
                    res.redirect('/home');
                })
                .catch(next)
        }
    }
}
