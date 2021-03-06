var express = require('express');
var todoRouter = express.Router();

var router = function(nav) {
    var todoController = require('../controllers/todoController')(nav);

    todoRouter.route('/')
        .get(todoController.getAll)
        .post(todoController.createItem);
    todoRouter.route('/delete')
        .post(todoController.removeItem);
    return todoRouter;
}

module.exports = router;