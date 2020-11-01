const {Play} = require('../models');

module.exports = {
    get: {
        home(req, res, next) {
            if (req.user) {
                let searchArgs = 'createdAt'
                if (req.query.search) searchArgs = req.query.search;
                let sortParams = {};
                sortParams[searchArgs] = 'desc'
                Play
                    .find({isPublic: true})
                    .sort(sortParams)
                    .lean()
                    .then(plays => {
                        res.render('home/theater', {plays})
                    })
                    .catch(next);
                return
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
