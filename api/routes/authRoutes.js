'use strict';

var auth = require('../controllers/authControllers');
var authValidationMiddleware = require('../middlewares/authMiddlewares');

// router.post('/signup', 
//     authValidationMiddleware.validSession,
//     auth.create_new_user
// );

// router.post('/signin', 
//     authValidationMiddleware.validSession, 
//     auth.login_user
// );

// router.get('/signout',
//     authValidationMiddleware.notValidSession, 
//     auth.logout_user
// );

module.exports = function(app) {
    // Sign in Route to Login a user and create a session.
    app.post('/signin', [
        authValidationMiddleware.notValidSession,
        auth.login_user
    ]);
    
    // Signup Route to create a new user.
    app.post('/signup', [
        authValidationMiddleware.notValidSession,
        auth.create_new_user
    ]);

    // Logout the user and destroy the session.
    app.get(
        '/signout', [
        authValidationMiddleware.validSession,
        auth.logout_user
    ]);
};