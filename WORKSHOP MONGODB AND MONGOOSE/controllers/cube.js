const cubeModel = require("../models/cubes");
const accessoryModel = require("../models/accessory");

module.exports = {
    getCubes(req, res) {
        cubeModel.find({}).lean().then((cubes) => {
            return res.render('index', {cubes});
        })
    },

    getCubeDetails(req, res) {
        cubeModel
            .findById(req.params.id)
            .populate('accessories')
            .lean()
            .then(cube => {
                return res.render('details-cube', {cube});
            });
    },
    createCubeGET(req, res) {
        return res.render('create-edit-cube');
    },
    createCubePOST(req, res) {
        let {name, description, imageURL, difficultyLevel} = req.body;
        cubeModel.create({name, description, imageURL, difficultyLevel})
            .then(res.redirect('/'))
    },

    search(req, res) {
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
                res.render('index', {cubes, from, search, to});
            })
    },

    deleteCube(req, res) {
        cubeModel.findByIdAndDelete(req.params.id)
            .then(res.redirect('/'))
    },

    editCubeGET(req, res) {
        cubeModel.findById(req.params.id).lean().then(cube => {
            return res.render('create-edit-cube', {cube, edit: true});
        });
    },
    editCubePOST(req, res) {
        cubeModel.updateOne({_id: req.params.id}, req.body)
            .then(res.redirect(`/details-cube/${req.params.id}`))
    },

    attachCubeGET(req, res) {
        Promise.all([
            accessoryModel.findById(req.params.id).lean(),
            cubeModel.find({accessories: {$nin: req.params.id}}).lean()
        ]).then(([accessory, cubes]) => {
            res.render('attach-cube', {
                accessory,
                cubes,
                noAvailableCubes: cubes.length === 0
            });
        })
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
