'use strict';
module.exports = function(app) {
    var todoList = require('../controllers/todoListController'),
        authMiddlewares = require('../middlewares/authMiddlewares');
    // Route to get all tasks or create a new task by logged in user.
    app.route('/tasks')
        .get(
            authMiddlewares.authenticateToken,
            todoList.list_all_tasks
        )
        .post(
            authMiddlewares.authenticateToken,
            todoList.create_a_task
    );
    
    // Perform various operations on a particular task like get, modify and delete the task.
    app.route('/tasks/:taskId')
        .get(
            authMiddlewares.authenticateToken,
            todoList.read_a_task
        )
        .put(
            authMiddlewares.authenticateToken,
            todoList.update_a_task
        )
        .delete(
            authMiddlewares.authenticateToken,
            todoList.delete_a_task
        );
};