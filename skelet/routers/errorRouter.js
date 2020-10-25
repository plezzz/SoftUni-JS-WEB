const {errorController} = require('../controllers');

module.exports = (router) => {
    router.get('*', errorController.get.displayError);

    return router
}
