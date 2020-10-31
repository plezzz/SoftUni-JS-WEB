module.exports = (express, app) => {
    const routers = require('../routers')(express.Router());


    app.use('/home', routers.home);
    app.use('/user', routers.user);
    app.use('/play', routers.play);
    app.use('/plays', routers.play);
    app.use('/', routers.home);
    app.use('*', routers.error)
}
