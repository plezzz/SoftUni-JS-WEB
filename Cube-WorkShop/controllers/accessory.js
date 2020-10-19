let accessoryModel = require('../models/accessory');
let cubeModel = require('../models/cubes');

module.exports = {
    getAccessory(req, res, next) {
        accessoryModel
            .find()
            .lean()
            .then((accessory) => {
                return res.render('all-accessory', {accessory});
            })
            .catch(next);
    },

    getAccessoryDetails(req, res, next) {
        accessoryModel
            .findById(req.params.id)
            .populate('cubes')
            .lean()
            .then(accessory => {
                return res.render('details-accessory', {accessory});
            })
            .catch(next);
    },
    createAccessoryGET(req, res, next) {
        return res.render('create-edit-accessory');
    },
    createAccessoryPOST(req, res, next) {
        accessoryModel.create(req.body)
            .then(res.redirect('/all-accessory'))
            .catch(next);
    },

    deleteAccessory(req, res, next) {
        accessoryModel.findByIdAndDelete(req.params.id)
            .then(res.redirect('/all-accessory'))
            .catch(next);
    },
    editAccessoryGET(req, res, next) {
        accessoryModel.findById(req.params.id).lean().then(accessory => {
            return res.render('create-edit-accessory', {accessory, edit: true});
        });
    },
    editAccessoryPOST(req, res, next) {
        accessoryModel.updateOne({_id: req.params.id}, req.body)
            .then(res.redirect(`/details-accessory/${req.params.id}`))
            .catch(next);
    },

    attachAccessoryGET(req, res, next) {
        Promise.all([
            cubeModel.findById(req.params.id).lean(),
            accessoryModel.find({cubes: {$nin: req.params.id}}).lean()
        ]).then(([cube, accessories]) => {
            res.render('attach-accessory', {
                cube,
                accessories,
                noAvailableAccessories: accessories.length === 0
            });
        })
            .catch(next);
    },

    attachAccessoryPOST(req, res, next) {
        const cubeId = req.params.id;
        const accessoryId = req.body.accessory;

        Promise.all([
            accessoryModel.updateOne({_id: accessoryId}, {$push: {cubes: cubeId}}),
            cubeModel.updateOne({_id: cubeId}, {$push: {accessories: accessoryId}})
        ])
            .then(() => {
                res.redirect('/details-cube/' + cubeId);
            }).catch(next);
    }
};
