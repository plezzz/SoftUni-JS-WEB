const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 3000,
        dbURL: 'mongodb://localhost:27017/ShoeShelf',
        template: 'hbs',
        publicDir: 'public',
        cookie: 'x-auth-token',
        secret: 'SuperSecretSecret',
        saltRounds: 11,
        expire: '1h',
        pricePrecision: 100
    }
};

module.exports = config[env];
