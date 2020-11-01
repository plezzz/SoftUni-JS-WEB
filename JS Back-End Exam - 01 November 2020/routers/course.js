const {checkAuth} = require("../utils");
const {course} = require('../controllers');

module.exports = (router) => {
    router.get('/create', checkAuth(true), course.get.create);
    router.get('/details/:courseId', checkAuth(true), course.get.details);
    router.get('/edit/:courseId', checkAuth(true), course.get.edit);
    router.get('/delete/:courseId', checkAuth(true), course.get.delete);
    router.get('/enroll/:courseId', checkAuth(true), course.get.enroll);

    router.post('/create', checkAuth(true), course.post.create);
    router.post('/edit/:courseId', checkAuth(true), course.post.edit)


    return router
}
