let accessoryModel = require('../models/accessory');
let cubeModel = require('../models/cubes');

module.exports = {
    getAccessory(req, res) {
        accessoryModel.find().lean().then((accessory) => {
            return res.render('all-accessory', {accessory});
        })
    },

    getAccessoryDetails(req, res) {
        accessoryModel.findById(req.params.id).populate('cubes').lean().then(accessory => {
            return res.render('details-accessory', {accessory});
        });
    },
    createAccessoryGET(req, res) {
        return res.render('create-edit-accessory');
    },
    createAccessoryPOST(req, res) {
        accessoryModel.create(req.body)
            .then(res.redirect('/all-accessory'))
    },

    deleteAccessory(req, res) {
        accessoryModel.findByIdAndDelete(req.params.id)
            .then(res.redirect('/all-accessory'))
    },
    editAccessoryGET(req, res) {
        accessoryModel.findById(req.params.id).lean().then(accessory => {
            return res.render('create-edit-accessory', {accessory, edit: true});
        });
    },
    editAccessoryPOST(req, res) {
        accessoryModel.updateOne({_id: req.params.id}, req.body)
            .then(res.redirect(`/details-accessory/${req.params.id}`))
    },

    attachAccessoryGET(req, res) {
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
    },

    attachAccessoryPOST(req, res, next) {
        const cubeId = req.params.id;
        const accessoryId = req.body.accessory;

        Promise.all([
            accessoryModel.updateOne({ _id: accessoryId }, { $push: { cubes: cubeId } }),
            cubeModel.updateOne({ _id: cubeId }, { $push: { accessories: accessoryId } })
        ])
            .then(() => {
                res.redirect('/details-cube/' + cubeId);
            }).catch(next);
    }
};
