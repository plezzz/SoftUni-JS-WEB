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
        profile(req, res, next) {
            const id = req.user._id
            let myOffers = 0
            let total = 0
            User
                .findOne({_id: id})
                .populate('offersBought')
                .lean()
                .then(user => {
                        user.offersBought.forEach(offer => {
                            total += offer.price
                        })
                        res.render(templateDir('profile'), {user, myOffers, total})
                    }
                )
                .catch(next)
        },
        logout(req, res) {
            res
                .clearCookie(cookie)
                .redirect('/login')
        }
    },
    post: {
        register(req, res, next) {
            const {email, fullName, password, repeatPassword} = {...req.body};
            const myOffers = 0
            User.create({email, fullName, password, repeatPassword, myOffers})
                .then(() => {
                    res.redirect('/')
                })
                .catch(next)
        },
        login(req, res, next) {
            const {email, password} = {...req.body}

            User.findOne({email})
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
                    res.redirect('/');
                })
                .catch(next)
        }
    }
}
