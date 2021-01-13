'use strict';

// const { JsonWebTokenError } = require('jsonwebtoken');

var mongoose = require('mongoose'),
    User = mongoose.model('Users'),
    jwt = require('jsonwebtoken');

// Create a new user.
exports.create_new_user = function(req, res) {
    var new_user = new User(req.body);
    new_user.save(function(err, user) {
        if(err)
            return res.json(err);
        return res.json({message: 'User Created Successfully. Kindly login to continue.'});
    });
};

// // Login the user and create a new session.
// exports.login_user = function(req, res) {
//     const username = req.body.username,
//         password = req.body.password;
    
//     // console.log(req.body);
    
//     User.findOne({username: username}, function(err, user) {
//         if(err) {
//             return res.status(400).json({message: 'Invalid username or pasword.'});
//         }
//         // console.log(user);
//         if(user && user.password === password){
//             req.session.regenerate(function(err) {
//                 if(err)
//                     return res.send(err);                
//             });
//             req.session.userId = user._id;
//             return res.json({message: 'Log-In Successful.', userId: req.session.userId});
//         } else {
//             return res.status(400).json({message: 'Invalid username or password'});
//         }
//     });
// };

exports.login_user = function(req, res) {
    const username = req.body.username,
        password = req.body.password;
    
    if(username && password) {
        User.findOne({username: username}, function(err, user) {
            if(err) {
                return res.status(400).json({message: 'Invalid username or password.'});
            }

            if(user && user.password === password) {
                jwt.sign({userId: user._id}, process.env.TOKEN_SECRET, { expiresIn: '1800s', algorithm: 'HS256' }, (err, token) => {
                    if(err)
                        res.status(400).json({message: 'Invalid Username or Password.'});
                    
                    res.cookie('token', token);
                    return res.status(200).json({message: 'Login Successful.'});

                });
                // const token = jwt.sign({ username }, process.env.TOKEN_SECRET, {
                //     algorithm: "HS256",
                //     expiresIn: jwtExpirySeconds,
                // });
                // res.cookie('token', token);
                // return res.status(200).json({message: 'Successfully logged in.'});
            } else {
                return res.status(400).json({message: 'Invalid username or password.'});
            }
        })
    }
    else {
        return res.status(400).json({message: 'Please provide username and password.'});
    }
};

// Logout the user and delete the session.
exports.logout_user = function(req, res) {
    // req.session.destroy((err) => {
    //     if(err)
    //         console.log(err);
    // return res.json({message: 'Logged out Successfully.'});
    // });
    res.clearCookie('token');
    return res.status(200).json({message: 'Logged-out Successfully'});
};