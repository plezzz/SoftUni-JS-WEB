const jwt = require('jsonwebtoken')
const {secret, expire} = require('../config')

module.exports = {
    createToken(_id) {
        return jwt.sign({_id}, secret, {expiresIn: expire})
    },
    verifyToken(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, payload) => {
                if (err) {
                    reject(err)
                    return;
                }
                resolve(payload)
            })
        })
    }
}
