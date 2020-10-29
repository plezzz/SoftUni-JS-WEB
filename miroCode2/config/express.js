const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const path = require('path')
const { auth } = require('../utils');

module.exports = (express, app) => {
    app.use(express.static('public'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(cookieParser());

    app.use(auth);

    app.engine('hbs', handlebars({
        partialsDir   : path.join(__basedir, "views/partials"),
        layoutsDir    : path.join(__basedir, "views/layouts"),
        extname       : '.hbs',
    }));
     app.set('view engine', 'hbs');
};
