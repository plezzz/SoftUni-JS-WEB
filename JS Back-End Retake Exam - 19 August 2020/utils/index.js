const jwt = require('./jwt');
const auth = require('./auth');
const checkAuth =require('./check-auth')
const priceNormalizer = require('./price')
const loginValidator = require('./loginValidator')

module.exports ={
    jwt,
    auth,
    checkAuth,
    priceNormalizer,
    loginValidator
}
