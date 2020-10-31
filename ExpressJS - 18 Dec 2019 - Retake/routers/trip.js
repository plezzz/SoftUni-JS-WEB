const {checkAuth} = require("../utils");
const {trip} = require('../controllers');

module.exports = (router) => {
    router.get('/offer', checkAuth(true), trip.get.create);
    router.get('/shared',checkAuth(true), trip.get.shared);
    router.get('/offer/:offerId',checkAuth(true), trip.get.details);
    //router.get('/edit/:playId', checkAuth(true), trip.get.edit);
    router.get('/delete/:offerId', checkAuth(true), trip.get.delete);
    router.get('/join/:offerId', checkAuth(true), trip.get.join);

     router.post('/offer',checkAuth(true), trip.post.create);
   // router.post('/edit/:playId',checkAuth(true), trip.post.edit)


    return router
}
