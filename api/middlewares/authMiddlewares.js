'use strict';

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