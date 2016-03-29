var dal = require('../dal/todoDal');
var moment = require('moment');

var todoController = function (nav) {
    var getAll = function (req, res) {
        dal.getAll(function (result) {
            var todos = [];
            for (var i = 0; i < result.Items.length; i++) {
                todos.push({
                    color: result.Items[i].color.S,
                    text: result.Items[i].Text.S,
                    dueDate: result.Items[i].DueDate.S
                })
            }
            res.render('todoList', {
                nav: nav,
                todos: todos
            });
        });
    };

    var getItem = function (req, res) {

    };

    var createItem = function (req, res) {
        console.log("Creating new Item:" + req.body.taskText);
        var taskText = req.body.taskText;
        var color = req.body.color;
        var date = moment(req.body.date.toString()).format('DD-MM-YYYY');
        
        dal.addTodo(taskText, date, color, function (err, result) {
            console.log("Adding '" + taskText + "' to the tasks!");
            if (err) {
                res.render('todoList', {
                    nav: nav,
                    todos: todos,
                    err: err
                });
            } else {
                res.send("OK");
            }
        });
    };

    var removeItem = function (req, res) {
        
        var task = req.body.text;
        var date = req.body.date;
        console.log("removing item with:" + task + " and due date:" + date);
        dal.deleteTodo(task, date, function (err, data) {
            if (err)
                res.send("FAILED");
            else
                res.send("OK");
        });

    };

    return {
        getAll: getAll,
        getItem: getItem,
        createItem: createItem,
        removeItem: removeItem
    };
};

module.exports = todoController;