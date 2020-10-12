const express = require('express');
const handlebars = require('express-handlebars');
const path = require("path");

module.exports = (app) => {
    app.engine('hbs', handlebars({
        extname: '.hbs',
        layoutsDir: path.join(__basedir, "views/layout")
    }));

    app.set('view engine', 'hbs');

    app.use(express.urlencoded({extended: true}));

    app.use(express.static('static'))
};
