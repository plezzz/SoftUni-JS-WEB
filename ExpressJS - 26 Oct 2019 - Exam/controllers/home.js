const {User} = require('../models');

module.exports = {
    get: {
        home(req, res, next) {
            if (req.user) {
                let userID = req.user._id;
                User
                    .findOne({_id: userID})
                    .populate('expenses')
                    .lean()
                    .then(user => {
                        res.render('home/money', user)
                    })
                    .catch(next)
                return
            }
            res.render('home/home')
        }
    }
};
