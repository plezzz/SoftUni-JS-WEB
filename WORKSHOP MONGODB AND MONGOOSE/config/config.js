module.exports = {
    development: {
        port: process.env.PORT || 3000,
        mongoDB: "mongodb://127.0.0.1:27017/rubiksCube",
    },
    production: {},
    encoding: "UTF-8"
};
