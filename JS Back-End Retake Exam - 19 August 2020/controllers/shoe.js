const {Shoe, User} = require('../models');
const {priceNormalizer} = require('../utils')

let templateDir = (doc) => {
    return `shoes/${doc}`
};

module.exports = {
    get: {
        create(req, res) {
            res.render(templateDir('create'))
        },
        details: function (req, res, next) {
            let id = req.params.shoeId
            let isCreator = false;
            let isBuyer = false
            let userID = req.user._id.toString()
            let buyers = 0;

            Shoe
                .findOne({_id: id})
                .lean()
                .then(shoe => {
                    shoe.createdBy.toString() === userID ? isCreator = true : isCreator = false
                    if (shoe.buyers) {
                        buyers = shoe.buyers.length;
                        shoe.buyers.forEach(buyerID => {
                            if (buyerID.toString() === userID) {
                                isBuyer = true
                            }
                        })
                    }
                    res.render(templateDir('details'), {shoe, isCreator, isBuyer, buyers})
                })
                .catch(next)
        },
        edit(req, res, next) {
            let id = req.params.shoeId
            Shoe
                .findOne({_id: id})
                .lean()
                .then(shoe => {
                    res.render(templateDir('edit'), shoe)
                })
                .catch(next)
        },
        delete(req, res, next) {
            let id = req.params.shoeId
            Shoe
                .deleteOne({_id: id})
                .then(() => {
                    res.redirect('/')
                })
                .catch(next)
        },
        buy(req, res, next) {
            let shoeID = req.params.shoeId
            let userID = req.user._id
            Promise.all([
                User.updateOne({_id: userID}, {$push: {offersBought: shoeID}}),
                Shoe.updateOne({_id: shoeID}, {$push: {buyers: userID}})
            ]).then(() => {
                res.redirect(`/shoes/details/${shoeID}`)
            })
                .catch(next)
        }
    },

    post: {
        create(req, res, next) {
            const createdAt = new Date();
            const createdBy = req.user._id;
            let {name, price, imageURL, description, brand} = req.body;
            price = priceNormalizer(price)
            Promise.all([
                Shoe.create({name, price, imageURL, description, brand, createdAt, createdBy}),
                User.updateOne({_id: createdBy}, {$inc : {'myOffers' : 1}})
            ]).then(() => {
                res.redirect('/')
            })
                .catch(next)
        },
        edit(req, res, next) {
            let id = req.params.shoeId
            let {name, price, imageURL, description, brand} = req.body;
            price = priceNormalizer(price)

            Shoe
                .updateOne({_id: id}, {name, price, imageURL, description, brand})
                .then(() => {
                    res.status(204)
                    res.redirect(`/shoes/details/${id}`)
                })
                .catch(next)
        },
    }
}


