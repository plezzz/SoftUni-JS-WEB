const {userController} = require('../controllers')
const {checkAuth} = require('../utils')

module.exports =(router)=>{
    router.get('/login',checkAuth(false),userController.get.login);
    router.get('/register',checkAuth(false),userController.get.register);
    router.get('/profile',checkAuth(true),userController.get.profile);
    router.get('/logout',checkAuth(true),userController.get.logout);

    router.post('/login',userController.post.login)
    router.post('/register',userController.post.register)

    return router
}
