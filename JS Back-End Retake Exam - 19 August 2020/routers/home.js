const {home} = require('../controllers');

module.exports = (router) => {
    router.get('/', home.get.home);

    return router
}
