const express = require('express');
const handlebars = require('express-handlebars');

module.exports = (app) => {

    app.engine('hbs', handlebars({
        defaultLayout: false,
        extname: '.hbs',
    }));

    app.set('view engine', 'hbs');

    app.use(express.urlencoded({extended: true}));

    app.use(express.static('static'))
};
