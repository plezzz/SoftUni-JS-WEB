const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const path = require("path");
const auth = require('../utils/auth');

module.exports = (app) => {
    app.engine('hbs', handlebars({
        extname: '.hbs',
        layoutsDir: path.join(__basedir, "views/layout")
    }));

    app.set('view engine', 'hbs');
    app.use(cookieParser());
    app.use(express.urlencoded({extended: true}));
    app.use(auth);

    app.use(express.static('static'))
};
