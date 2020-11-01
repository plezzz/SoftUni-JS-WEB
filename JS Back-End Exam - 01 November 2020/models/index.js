const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const getUserModel = require('./User');
const getCourseModel = require('./Course');

module.exports = {
    User: getUserModel(mongoose, bcrypt),
    Course: getCourseModel(mongoose)
};
