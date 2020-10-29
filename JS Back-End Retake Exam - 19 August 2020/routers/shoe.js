const {checkAuth} = require("../utils");
const {shoe} = require('../controllers');

module.exports = (router) => {
    router.get('/create', checkAuth(true), shoe.get.create);
    router.get('/details/:shoeId', checkAuth(true), shoe.get.details);
    router.get('/edit/:shoeId', checkAuth(true), shoe.get.edit);
    router.get('/delete/:shoeId', checkAuth(true), shoe.get.delete);
    router.get('/buy/:shoeId', checkAuth(true), shoe.get.buy);

    router.post('/create', shoe.post.create);
    router.post('/edit/:shoeId', shoe.post.edit)


    return router
}
