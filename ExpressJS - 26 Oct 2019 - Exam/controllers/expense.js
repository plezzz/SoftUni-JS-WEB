const {Expense, User} = require('../models');
const {normalizeAmount} = require('../utils');

let templateDir = (doc) => {
    return `money/${doc}`
};

module.exports = {
    get: {
        create(req, res) {
            res.render(templateDir('create'))
        },
        details(req, res, next) {
            let id = req.params.expenseId;

            Expense
                .findOne({_id: id})
                .lean()
                .then(expense => {
                    res.render(templateDir('report'), {expense})
                })
                .catch(next)
        },
        delete(req, res, next) {
            let id = req.params.expenseId;
            Expense
                .deleteOne({_id: id})
                .then(() => {
                    res.redirect('/')
                })
                .catch(next)
        },
    },

    post: {
        create: function (req, res, next) {
            const createdBy = req.user._id;
            let {merchant, total, category, description, checkbox} = req.body, report;
            checkbox ? report = true : report = false;
            total = normalizeAmount(total)
            Expense.create({merchant, total, category, description, report, createdBy})
                .then(expense => {
                    User.updateOne({_id: createdBy}, {$push: {expenses: expense}}).then(() => {
                    });
                })
                .then(() => {
                    res.redirect('/')
                })
                .catch(next)
        },
    }
};


