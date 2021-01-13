'use strict';

var mongoose = require('mongoose'),
    Task = mongoose.model('Tasks');

// List all the tasks of currently logged in user.
exports.list_all_tasks = function(req, res) {
    Task.find({userId: req.user}, function(err, tasks) {
        if(err)
            return res.send(err);
        return res.json(tasks);
    });
};

// Create a new task in user account.
exports.create_a_task = function(req, res) {
    var new_task = new Task(req.body);
    new_task.userId = req.user;
    new_task.save(function(err, task) {
        if(err)
            return res.send(err);
        return res.json(task);
    });
};

// Get the task with id (taskId) of currently logged in user.
exports.read_a_task = function(req, res) {
    Task.find({
        $and: [
            {_id: req.params.taskId},
            {userId: req.user}
        ]
    }, 
        function(err, task) {
            if(err)
                return res.send(err);
            if(task.length === 0)
                return res.status(403).json({message: 'Unauthorized Request.'});
            else
                return res.json(task);
    });
};

// Update the task with id (taskId) if that task was created by currently logged in user.
exports.update_a_task = function(req, res) {
    Task.findOneAndUpdate({
        $and: [
            {_id: req.params.taskId},
            {userId: req.user}
        ]}, req.body, {new: true}, function(err, task) {
            // console.log(task);
            if(err)
                return res.send(err);
            if(!task)
                return res.status(403).json({message: 'Unauthorized Request.'});
            return res.json(task);
    });
};

// Delete a task with id (taskID) if that task was created by logged in User.
exports.delete_a_task = function(req, res) {
    Task.remove({
        $and: [
            {_id: req.params.taskId},
            {userId: req.user}
        ]
    },
        function(err, task) {
            if(err)
                return res.send(err);
            if(task.deletedCount === 0)
                return res.status(403).json({message: 'Unauthorized Request.'});
            else
                return res.json({message: 'Task deleted Successfully.'});
    });
};