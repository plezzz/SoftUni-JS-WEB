const cubeModel = require("../models/cubs");

module.exports = {
    getCubes(req, res) {
        cubeModel.getAll().then(cubes => {
            return res.render('index', {cubes})
        });
    },

    getCubeDetails(req, res) {
        const id = req.params.id;
        cubeModel.getOneCube(id).then(cube => {
            return res.render('details', {cube, id});
        });
    },
    createCubeGET(req, res) {
        return res.render('create');
    },
    createCubePOST(req, res) {
        cubeModel.insertCube(req.body)
            .then(res.redirect('/'))
    },
    indexPOST(req, res) {
        let {search, from, to} = req.body;
        cubeModel.searchCube(search, from, to).then(cubes => {
            return res.render('index', {cubes})
        });
    },
    deleteCube(req, res) {
        cubeModel.deleteCube(req.params.id)
            .then(res.redirect('/'))
    },
    editCubeGET(req, res) {
        const id = req.params.id;
        cubeModel.getOneCube(id).then(cube => {
            return res.render('create', {cube, id});
        });
    },
    editCubePOST(req, res) {
        const id = req.params.id;
        cubeModel.editCube(req.body, id)
            .then(res.redirect(`/details/${id}`))
    }
};
