const jwt = require('./jwt');
const auth = require('./auth');
const checkAuth =require('./check-auth')
const loginValidator = require('./loginValidator')
const normalizeInput = require('./normalizeInput')

module.exports ={
    jwt,
    auth,
    checkAuth,
    loginValidator,
    normalizeInput
}
