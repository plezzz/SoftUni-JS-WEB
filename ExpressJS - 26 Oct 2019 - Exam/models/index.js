const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const getUserModel = require('./User');
const getExpenseModel = require('./Expense');

module.exports = {
    User: getUserModel(mongoose, bcrypt),
    Expense: getExpenseModel(mongoose)
};
