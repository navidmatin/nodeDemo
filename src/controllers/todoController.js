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
                    dueDate: moment(result.Items[i].DueDate.S).format('DD-MM-YYYY')
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
        var date = req.body.date;
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

    };

    return {
        getAll: getAll,
        getItem: getItem,
        createItem: createItem,
        removeItem: removeItem
    };
};

module.exports = todoController;