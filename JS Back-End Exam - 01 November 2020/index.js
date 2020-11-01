global.__basedir = __dirname;
const express = require('express');
const {port} = require('./config');
const messages = require("./config/messages")(port);
const globalErrorHandler = require('./config/global-error-handler');

const app = express();

require('./config/database')().then(() => {

    require('./config/express')(express, app);
    require('./config/routes')(express, app);

    app.use(globalErrorHandler);
    app.listen(port, console.log(messages.app));

}).catch((e) => console.log(e));
