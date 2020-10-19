const cubeController = require('../controllers/cube');
const accessoryController = require('../controllers/accessory');
const baseController = require('../controllers/base');
const userController = require('../controllers/user');
const checkAuth = require('../utils/check-auth');
const handleValidationErrors = require('../utils/handle-validation-errors');
const setValidationErrorViewName = require('../utils/set-validation-error-view-name');

const userValidators = require('../utils/bodyValidator');

module.exports = (app) => {
    app.get('/',
        cubeController.getCubes
    );
    app.get('/about',
        checkAuth(false),
        baseController.getAbout
    );

    app.get('/login',
        checkAuth(false),
        userController.getLogin
    );
    app.get('/register',
        checkAuth(false),
        userController.getRegister
    );
    app.get('/logout',
        userController.getLogout
    );

    app.get('/create-cube',
        checkAuth(true),
        cubeController.createCubeGET
    );
    app.get('/details-cube/:id',
        cubeController.getCubeDetails
    );
    app.get('/delete-cube/:id',
        checkAuth(true),
        cubeController.deleteCube
    );
    app.get('/edit-cube/:id',
        checkAuth(true),
        cubeController.editCubeGET
    );
    app.get('/attach-cube/:id',
        checkAuth(true),
        cubeController.attachCubeGET
    );

    app.get('/all-accessory',
        checkAuth(true),
        accessoryController.getAccessory
    );
    app.get('/create-accessory',
        checkAuth(true),
        accessoryController.createAccessoryGET
    );
    app.get('/details-accessory/:id',
        checkAuth(true),
        accessoryController.getAccessoryDetails
    );
    app.get('/delete-accessory/:id',
        checkAuth(true),
        accessoryController.deleteAccessory
    );
    app.get('/edit-accessory/:id',
        checkAuth(true),
        accessoryController.editAccessoryGET
    );
    app.get('/attach-accessory/:id',
        checkAuth(true),
        accessoryController.attachAccessoryGET
    );


    app.post('/',
        cubeController.search
    );

    app.post('/login',
        checkAuth(false),
        userController.postLogin
    );
    app.post('/register',
        checkAuth(false),
        setValidationErrorViewName('register'),
        userValidators.checkUsernameExistence,
        userValidators.repeatPasswordCheck,
        handleValidationErrors,
        userController.postRegister
    );

    app.post('/create-cube',
        checkAuth(true),
        cubeController.createCubePOST
    );
    app.post('/edit-cube/:id',
        checkAuth(true),
        cubeController.editCubePOST
    );
    app.post('/attach-cube/:id',
        checkAuth(true),
        cubeController.attachCubePOST
    );

    app.post('/create-accessory',
        checkAuth(true),
        accessoryController.createAccessoryPOST
    );
    app.post('/edit-accessory/:id',
        checkAuth(true),
        accessoryController.editAccessoryPOST
    );
    app.post('/attach-accessory/:id',
        checkAuth(true),
        accessoryController.attachAccessoryPOST
    );

    app.get('*',
        baseController.get404
    );
};
