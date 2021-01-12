'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('Users');

// Create a new user.
exports.create_new_user = function(req, res) {
    var new_user = new User(req.body);
    new_user.save(function(err, user) {
        if(err)
            return res.json(err);
        return res.json({message: 'User Created Successfully. Kindly login to continue.'});
    });
};

// Login the user and create a new session.
exports.login_user = function(req, res) {
    const username = req.body.username,
        password = req.body.password;
    
    // console.log(req.body);
    
    User.findOne({username: username}, function(err, user) {
        if(err) {
            return res.status(400).json({message: 'Invalid username or pasword.'});
        }
        // console.log(user);
        if(user && user.password === password){
            req.session.regenerate(function(err) {
                if(err)
                    return res.send(err);                
            });
            req.session.userId = user._id;
            return res.json({message: 'Log-In Successful.', userId: req.session.userId});
        } else {
            return res.status(400).json({message: 'Invalid username or password'});
        }
    });
};

// Logout the user and delete the session.
exports.logout_user = function(req, res) {
    req.session.destroy((err) => {
        if(err)
            console.log(err);
    return res.json({message: 'Logged out Successfully.'});
    });
};