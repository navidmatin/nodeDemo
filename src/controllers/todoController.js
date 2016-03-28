var dal = require('../dal/todoDal');

var todoController = function(nav){
    var todos = null;
    var getAll = function(req,res){
        dal.getAll(function(result){
            todos = result;
            res.render('todoList',{
              nav:nav,
              todos: result
           }); 
        });
    }
    
    var getItem = function(req, res){
        
    }
    
    var createItem = function(req, res){
        console.log("Creating new Item:" + req);
        var taskText = req.body.text;
        var color = req.body.color;
        var date = req.body.date;
        dal.addTodo(taskText, date, color, function(err, result){
            console.log("Adding '" + taskText + "' to the tasks!");
            if(err)
                {
                    res.render('todoList', {
                        nav:nav,
                        todos: todos,
                        err: err
                    });
                }
            else
                {
                    //Add the new task to the todoList and render it
                    todos.push({
                        "Text":taskText,
                        "DueDate":date,
                        "color":color
                    });
                    res.render('todoList',{
                        nav:nav,
                        todos: todos
                    });
                }
        });
    }
    
    var removeItem = function(req, res){
        
    }
    
    return {
        getAll: getAll,
        getItem: getItem,
        createItem: createItem,
        removeItem: removeItem
    }
}

module.exports = todoController;