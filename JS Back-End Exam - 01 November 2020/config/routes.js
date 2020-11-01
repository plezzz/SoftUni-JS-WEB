module.exports = (express, app) => {
    const routers = require('../routers')(express.Router());

    app.use('/home', routers.home);
    app.use('/user', routers.user);
    app.use('/course', routers.course);
    app.use('/courses', routers.course);
    app.use('/', routers.home);
    app.use('*', routers.error)
}
