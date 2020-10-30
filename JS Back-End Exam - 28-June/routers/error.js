const {error} = require('../controllers');

module.exports = (router) => {
    router.get('*', error.get.displayError);

    return router
}
