module.exports = (express, app) => {
    const routers = require('../routers')(express.Router());


    app.use('/home', routers.home);
    app.use('/user', routers.user);
    app.use('/trip', routers.trip);
    app.use('/trips', routers.trip);
    app.use('/', routers.home);
    app.use('*', routers.error)
}
