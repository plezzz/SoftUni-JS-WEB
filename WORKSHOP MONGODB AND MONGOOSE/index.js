global.__basedir = __dirname;
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const app = require('express')();

require('./config/express')(app);
require('./config/routes')(app);
require('./config/database')(config.mongoDB)
    .then(() => {
        app.listen(
            config.port,
            console.log(
                `Listening on port ${config.port}! Now its up to you...`
            ));
    });
