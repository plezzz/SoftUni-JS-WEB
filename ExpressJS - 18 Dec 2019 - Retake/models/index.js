const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const getUserModel = require('./User');
const getTripModel = require('./Trip');

module.exports = {
    User: getUserModel(mongoose, bcrypt),
    Trip: getTripModel(mongoose)
};
