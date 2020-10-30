const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const getUserModel = require('./User');
const getPlayModel = require('./Play');

module.exports = {
    User: getUserModel(mongoose, bcrypt),
    Play: getPlayModel(mongoose)
};
