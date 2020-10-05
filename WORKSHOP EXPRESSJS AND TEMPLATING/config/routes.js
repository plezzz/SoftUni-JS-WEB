const cubeController = require('../controllers/cube');
const baseController = require('../controllers/base');


module.exports = (app) => {
    app.get('/', cubeController.getCubes);
    app.get('/about', baseController.getAbout);
    app.get('/create', cubeController.createCubeGET);
    app.get('/details/:id', cubeController.getCubeDetails);
    app.get('/delete/:id', cubeController.deleteCube);
    app.get('/edit/:id', cubeController.editCubeGET);

    app.post('/create', cubeController.createCubePOST);
    app.post('/', cubeController.indexPOST);
    app.post('/edit/:id', cubeController.editCubePOST);

    app.use(baseController.get404);
};
