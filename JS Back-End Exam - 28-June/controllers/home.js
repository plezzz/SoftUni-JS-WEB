const {Play} = require('../models');

module.exports = {
    get: {
        home(req, res, next) {
            if (req.user) {
                // Shoe
                //     .find({})
                //     .sort({ buyers: 'desc'})
                //     .lean()
                //     .then(shoes => {
                //         res.render('home/theater', {shoes})
                //     })
                //     .catch(next)
                return;
            }
            Play
                .find({isPublic: true})
                .sort({likedPlays: 'desc'})
                .limit(3)
                .lean()
                .then(plays => {
                    res.render('home/home', {plays})
                })
                .catch(next);
        }
    }
};
