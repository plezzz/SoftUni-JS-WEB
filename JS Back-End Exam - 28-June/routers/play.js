const {checkAuth} = require("../utils");
const {play} = require('../controllers');

module.exports = (router) => {
    router.get('/create', checkAuth(true), play.get.create);
    router.get('/details/:playId',checkAuth(true), play.get.details);
    router.get('/edit/:playId', checkAuth(true), play.get.edit);
    router.get('/delete/:playId', checkAuth(true), play.get.delete);
    router.get('/like/:playId', checkAuth(true), play.get.like);

    router.post('/create',checkAuth(true), play.post.create);
    router.post('/edit/:playId',checkAuth(true), play.post.edit)


    return router
}
