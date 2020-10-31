module.exports = (express, app) => {
    const routers = require('../routers')(express.Router());

    app.use('/home', routers.home);
    app.use('/user', routers.user);
    app.use('/shoe', routers.shoe);
    app.use('/shoes', routers.shoe);
    app.use('/', routers.home);
    app.use('*', routers.error)
}
