const cubeModel = require("../models/cubes");
const accessoryModel = require("../models/accessory");

module.exports = {
    getCubes(req, res) {
        cubeModel.find({}).lean().then((cubes) => {
            return res.render('index', {cubes});
        })
    },

    getCubeDetails(req, res, next) {
        cubeModel
            .findById(req.params.id)
            .populate('accessories')
            .lean()
            .then(cube => {
                return res.render('details-cube', {cube});
            })
            .catch(next);
    },
    createCubeGET(req, res, next) {
        return res.render('create-edit-cube');
    },
    createCubePOST(req, res) {
        let {name, description, imageURL, difficultyLevel} = req.body;
        cubeModel.create({name, description, imageURL, difficultyLevel})
            .then(res.redirect('/'))
            .catch(next);
    },

    search(req, res, next) {
        let {search, from, to} = req.body;
        let query = {};

        search ? query.name = new RegExp(search, 'i') : null;
        from ? query.difficultyLevel = {$gte: +from} : null;

        if (to) {
            query.difficultyLevel = query.difficultyLevel || {};
            query.difficultyLevel.$lte = +to;
        }

        cubeModel.find(query).populate('accessories').lean()
            .then(cubes => {
                cubes.length === 0 ?
                    res.redirect('/') :
                    res.render('index', {cubes, from, search, to});
            })
            .catch(next);
    },

    deleteCube(req, res, next) {
        cubeModel.findByIdAndDelete(req.params.id)
            .then(res.redirect('/'))
            .catch(next);
    },

    editCubeGET(req, res, next) {
        cubeModel.findById(req.params.id)
            .lean()
            .then(cube => {
                return res.render('create-edit-cube', {cube, edit: true});
            })
            .catch(next);
    },
    editCubePOST(req, res, next) {
        cubeModel.updateOne({_id: req.params.id}, req.body)
            .then(res.redirect(`/details-cube/${req.params.id}`))
            .catch(next);
    },

    attachCubeGET(req, res, next) {
        Promise.all([
            accessoryModel.findById(req.params.id).lean(),
            cubeModel.find({accessories: {$nin: req.params.id}}).lean()
        ]).then(([accessory, cubes]) => {
            res.render('attach-cube', {
                accessory,
                cubes,
                noAvailableCubes: cubes.length === 0
            });
        }).catch(next);
    },

    attachCubePOST(req, res, next) {
        const accessoryID = req.params.id;
        const cubeID = req.body.accessory;

        Promise.all([
            cubeModel.updateOne({_id: cubeID}, {$push: {cubes: accessoryID}}),
            accessoryModel.updateOne({_id: accessoryID}, {$push: {accessories: cubeID}})
        ])
            .then(() => {
                res.redirect('/details-accessory/' + accessoryID);
            }).catch(next);
    }
};
