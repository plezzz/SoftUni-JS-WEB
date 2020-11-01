const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const path = require('path')
const {auth} = require('../utils');
const {template, publicDir} = require('./')

const hbsConfig = {
    partialsDir: path.join(__basedir, "views/partials"),
    layoutsDir: path.join(__basedir, "views/layouts"),
    extname: '.' + template,
    helpers: require('./handlebars-helpers') //only need this
}

module.exports = (express, app) => {

    app.use(express.static(publicDir));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    app.use(cookieParser());

    app.use(auth);

    app.engine(template, handlebars(hbsConfig));
    app.set('view engine', template);
    app.set('__basedir', __dirname + '/views');
};
