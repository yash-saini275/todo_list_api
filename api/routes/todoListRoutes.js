'use strict';
module.exports = function(app) {
    var todoList = require('../controllers/todoListController'),
        authMiddlewares = require('../middlewares/authMiddlewares');
    // Route to get all tasks or create a new task by logged in user.
    app.route('/tasks')
        .get(
            authMiddlewares.validSession,
            todoList.list_all_tasks
        )
        .post(
            authMiddlewares.validSession,
            todoList.create_a_task
    );
    
    // Perform various operations on a particular task like get, modify and delete the task.
    app.route('/tasks/:taskId')
        .get(
            authMiddlewares.validSession,
            todoList.read_a_task
        )
        .put(
            authMiddlewares.validSession,
            todoList.update_a_task
        )
        .delete(
            authMiddlewares.validSession,
            todoList.delete_a_task
        );
};