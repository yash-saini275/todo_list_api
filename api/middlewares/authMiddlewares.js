'use strict';

const jwt = require('jsonwebtoken');

// Authentication middlewares to check if the req has a valid session.
exports.validSession = function(req, res, next) {
    if(req.session.userId){
        return next();
    } else {
        return res.status(403).send({message: 'Invalid Session.'});
    }
};

// Authentication middleware to check if req doesn't have a valid session.
exports.notValidSession = function(req, res, next) {
    if(!req.session.userId) {
        return next();
    } else {
        return res.status(403).json({message: 'Already Logged-In.'});
    }
};

// Authenticate generated Token.
exports.authenticateToken = function (req, res, next) {
    const token = req.cookies.token;

    if(!token)
        return res.status(401).json({message: 'No valid token.'});
    
    jwt.verify(token, process.env.TOKEN_SECRET.toString(), (err, user) => {
        if(err) {
            return res.status(403).json({message: 'No valid token.'});
        }
        // console.log(user);
        req.user = user.userId;
        next();
    });
};