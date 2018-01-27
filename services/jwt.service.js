const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

module.exports = {

    issue(paylod, expiresIn){
        return jwt.sign(paylod, config.development.secret, {
         expiresIn:expiresIn
        })

    },
    verify(token){
        return jwt.verify(token, config.development.secret);
    }
};