const cubeController = require('../controllers/cube');
const accessoryController = require('../controllers/accessory');
const baseController = require('../controllers/base');


module.exports = (app) => {
    app.get('/', cubeController.getCubes);
    app.get('/about', baseController.getAbout);

    app.get('/create-cube', cubeController.createCubeGET);
    app.get('/details-cube/:id', cubeController.getCubeDetails);
    app.get('/delete-cube/:id', cubeController.deleteCube);
    app.get('/edit-cube/:id', cubeController.editCubeGET);
    app.get('/attach-cube/:id', cubeController.attachCubeGET);

    app.get('/all-accessory', accessoryController.getAccessory);
    app.get('/create-accessory', accessoryController.createAccessoryGET);
    app.get('/details-accessory/:id', accessoryController.getAccessoryDetails);
    app.get('/delete-accessory/:id', accessoryController.deleteAccessory);
    app.get('/edit-accessory/:id', accessoryController.editAccessoryGET);
    app.get('/attach-accessory/:id',accessoryController.attachAccessoryGET);



    app.post('/', cubeController.search);

    app.post('/create-cube', cubeController.createCubePOST);
    app.post('/edit-cube/:id', cubeController.editCubePOST);
    app.post('/attach-cube/:id', cubeController.attachCubePOST);

    app.post('/create-accessory', accessoryController.createAccessoryPOST);
    app.post('/edit-accessory/:id', accessoryController.editAccessoryPOST);
    app.post('/attach-accessory/:id',accessoryController.attachAccessoryPOST);

    app.use(baseController.get404);
};
