var express = require('express'),
    app = express(),
    PORT = 8080,
    mongose = require('mongoose'),
    Task = require('./api/models/todoListModel'),
    body_parser = require('body-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session);

mongose.Promise = global.Promise;

// Create a connection to MongoDB Database
mongose.connect('mongodb://mongo/Tododb');
mongose.set('useNewUrlParser', true);

// Register Models
require('./api/models/todoListModel');
require('./api/models/userModel');

// Store session information in MongoDB.
app.use(session({
    secret: '$up3r$3cr3t',
    store: new MongoStore({mongooseConnection: mongose.connection})
}));

// Body Parser to convert content of body to objects.
app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());

// Import routes.
var taskRoutes = require('./api/routes/todoListRoutes');
taskRoutes(app);
var authRoutes = require('./api/routes/authRoutes');
authRoutes(app);

// If no other route matches.
app.use(function(req, res) {
    res.status(400).send({url: req.originalUrl + ' not found'});
});

// Start the server on defined port number.
app.listen(PORT);

console.log('Todo List RESTful API server listening on: ' + PORT);