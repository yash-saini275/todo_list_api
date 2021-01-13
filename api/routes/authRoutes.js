'use strict';

var auth = require('../controllers/authControllers');
var authValidationMiddleware = require('../middlewares/authMiddlewares');

module.exports = function(app) {
    // Sign in Route to Login a user and create a session.
    app.post('/signin', [
        auth.login_user
    ]);
    
    // Signup Route to create a new user.
    app.post('/signup', [
        auth.create_new_user
    ]);

    // Logout the user and destroy the session.
    app.get(
        '/signout', [
        authValidationMiddleware.authenticateToken,
        auth.logout_user
    ]);
};