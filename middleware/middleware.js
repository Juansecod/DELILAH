var jwt = require('jsonwebtoken');
const errorResponse = require('../errors/users.errors.js');

const validationSession = ((req, res, next) => {
    const token = req.headers['authorization'];
    try{
        if (token) {
            jwt.verify(token, process.env.KEY_TOKEN, (err, decoded) => {
                if (err) {
                    throw new Error();            
                } else {
                    req.decoded = decoded
                    next()
                }
            });
        } else {
            throw new Error();
        }
    }catch(error){
        return errorResponse(res, error);
    }
});

const validationAdmin = ((req, res, next) => {
    const token = req.headers['authorization'];
    try{
        if (token) {
            jwt.verify(token, process.env.KEY_TOKEN, (err, decoded) => {
                if (err) {
                    throw new Error();
                } else if (decoded.idRol != 1) {
                    throw new Error('401');
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            throw new Error(400);
        }
    }catch(error){
        return errorResponse(res, error);
    }
});

exports.userMiddleware = { validationSession, validationAdmin };