const {Play, User} = require('../models');

let templateDir = (doc) => {
    return `theater/${doc}`
};

module.exports = {
    get: {
        create(req, res) {
            res.render(templateDir('create'))
        },
        details(req, res, next) {
            let id = req.params.playId;
            let userID = req.user._id.toString();
            let isCreator = false;
            let isLiked = false;

            Play
                .findOne({_id: id})
                .lean()
                .then(play => {

                    play.usersLiked.forEach(likedUserID => {
                        if (likedUserID.toString() === userID) {
                            isLiked = true
                        }
                    })
                    play.createdBy.toString() === userID ? isCreator = true : isCreator = false;


                    res
                        .render(templateDir('details'), {play, isCreator, isLiked})
                })
                .catch(next)
        },
        edit(req, res, next) {
            let id = req.params.playId;
            Play
                .findOne({_id: id})
                .lean()
                .then(play => {
                    res.render(templateDir('edit'), play)
                })
                .catch(next)
        },
        delete(req, res, next) {
            let id = req.params.playId;
            Play
                .deleteOne({_id: id})
                .then(() => {
                    res.redirect('/')
                })
                .catch(next)
        },
        like(req, res, next) {
            let playID = req.params.playId;
            let userID = req.user._id;
            Promise.all([
                User.updateOne({_id: userID}, {$push: {likedPlays: playID}}),
                Play.updateOne({_id: playID}, {$push: {usersLiked: userID},$inc: {likes: 1}})
            ]).then(() => {
                res.redirect(`/play/details/${playID}`)
            })
                .catch(next)
        }
    },

    post: {
        create: function (req, res, next) {
            const createdAt = new Date();
            const createdBy = req.user._id;
            let {title, description, imageURL, checkbox} = req.body, isPublic;
            checkbox ? isPublic = true : isPublic = false;

            Play.create({title, description, imageURL, isPublic, createdAt, createdBy})
                .then(() => {
                    res.redirect('/')
                })
                .catch(next)
        },
        edit(req, res, next) {
            let id = req.params.playId;
            let {title, description, imageURL, checkbox} = req.body, isPublic;
            checkbox ? isPublic = true : isPublic = false;


            Play
                .updateOne({_id: id}, {title, description, imageURL, isPublic})
                .then(() => {
                    res.status(204);
                    res.redirect(`/play/details/${id}`)
                })
                .catch(next)
        },
    }
};


