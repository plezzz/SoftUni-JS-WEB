const {User} = require('../models');
const {jwt} = require('../utils');
const {cookie} = require('../config');
const {errorLogin, refillError} = require('../config/messages')()
const {normalizeAmount} = require('../utils');

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
            let user = req.user._id, total = 0, merches = 0, available;

            User
                .findOne({_id: user})
                .populate('expenses')
                .lean()
                .then(user => {
                    user.expenses.forEach(expense => {
                        merches++
                        total += expense.total
                    })
                    available = user.amount
                    res.render(templateDir('profile'), {total, merches, available})
                })
                .catch(next)

        },
        addMoney(req, res, next) {
            let user = req.user._id
            let refill = req.query.refill;
            refill = normalizeAmount(refill)

            if (isNaN(refill)) {
                next(refillError.amountErr)
                return
            }
            User.updateOne({_id: user}, {$inc: {amount: refill}}).then(() => {
                res.redirect('/')
            }).catch(next)
        },
        logout(req, res) {
            res
                .clearCookie(cookie)
                .redirect('/login')
        }
    },
    post: {
        register(req, res, next) {
            let {username, password, repeatPassword, amount} = {...req.body};
            amount = normalizeAmount(amount)
            User.create({username, password, repeatPassword, amount})
                .then(() => {
                    res.redirect('/login')
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
