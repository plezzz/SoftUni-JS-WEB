const {Trip, User} = require('../models');
const {normalizeInput} = require('../utils')

let templateDir = (doc) => {
    return `trip/${doc}`
};

module.exports = {
    get: {
        create(req, res) {
            res.render(templateDir('offer'))
        },
        details(req, res, next) {
            let isCreator, buddies, availableSeats, isJoined;
            let id = req.params.offerId;
            let userID = req.user._id.toString();

            Trip
                .findOne({_id: id})
                .populate('createdBy')
                .populate('buddies')
                .lean()
                .then(trip => {
                    trip.createdBy._id.toString() === userID ? isCreator = true : isCreator = false;
                    trip.buddies.forEach(user => {
                        user._id.toString() === userID ? isJoined = true : isJoined = false;
                    })
                    buddies = trip.buddies.map.call(trip.buddies, function (item) {
                        return item.email;
                    }).join(", ");
                    availableSeats = trip.seats - trip.buddies.length;
                    res.render(templateDir('details'), {trip, isCreator, availableSeats, buddies, isJoined})
                })
                .catch(next)
        },
        delete(req, res, next) {
            let id = req.params.offerId;
            Trip
                .deleteOne({_id: id})
                .then(() => {
                    res.redirect('/shared')
                })
                .catch(next)
        },
        join(req, res, next) {
            let tripID = req.params.offerId;
            let userID = req.user._id;
            Promise.all([
                User.updateOne({_id: userID}, {$push: {trips: tripID}}),
                Trip.updateOne({_id: tripID}, {$push: {buddies: userID}})
            ]).then(() => {
                res.redirect(`/offer/${tripID}`)
            })
                .catch(next)
        },
        shared(req, res, next) {
            Trip
                .find({})
                .lean()
                .then(t => {
                    res.render(templateDir('shared'), {t})
                })
                .catch(next)
        }
    },

    post: {
        create: function (req, res, next) {
            const createdBy = req.user._id;
            let {startEnd, dateTime, carImage, seats, description} = req.body;
            let [startPoint, endPoint] = normalizeInput(startEnd)
            let [date, time] = normalizeInput(dateTime)

            Trip
                .create({startPoint, endPoint, date, time, seats, carImage, description, createdBy, startEnd, dateTime})
                .then(() => {
                    res.redirect('/shared')
                })
                .catch(next)
        }
    }
};


