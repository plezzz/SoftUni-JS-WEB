const {Shoe} = require('../models');

module.exports = {
    get: {
        home(req, res, next) {
            if (req.user) {
                Shoe
                    .find({})
                    .sort({ buyers: 'desc'})
                    .lean()
                    .then(shoes => {
                        res.render('home/shoes', {shoes})
                    })
                    .catch(next)
                return;
            }
            res.render('home/home')
        }
    }
};
