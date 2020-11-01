const mongoose = require('mongoose');
const dbConnectionString = require('./').dbURL;
const messages = require("./messages")();

const dbConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};

module.exports = () => {
    return mongoose.connect(dbConnectionString, dbConnectionOptions).then(data => {
        console.log(messages.db);
        return data
    })
};
