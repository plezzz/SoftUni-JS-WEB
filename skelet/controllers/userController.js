const { User } = require('../models');
const { jwt } = require('../utils');
const { cookie } = require('../config');

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
        profile(req, res) {
            res.render(templateDir('profile'))
        },
        logout(req, res) {
            res
                .clearCookie(cookie)
                .redirect('/home')
        }
    },
    post: {
        register(req, res, next) {
            const {email, fullName, password} = {...req.body};

            User.findOne({email})
                .then((user) => {
                    if (user) {
                        throw new Error('The given email is alredy is use...')
                    }
                    return User.create({email, fullName, password})
                })
                .then((createdUser) => {
                    res.redirect(templateDir('login'))
                })
                .catch(next)
        },
        login(req, res, next) {
            const {email, password} = {...req.body}

            User.findOne({email})
                .then((user) => {
                    return Promise.all([
                        user.comparePasswords(password),
                        user
                    ])
                })
                .then(([isPasswordMatched, user]) => {
                    if (!isPasswordMatched) {
                        throw new Error('The provided password does not matched.')
                    }

                    const token = jwt.createToken(user._id);

                    res.cookie(cookie, token, {maxAge: 3600000})
                    res.redirect('/shoes/all');
                })
                .catch(next)
        }
    }
}
