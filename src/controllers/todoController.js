var dal = require('../dal/todoDal');

var todoController = function(nav){
    var getAll = function(req,res){
        dal.getAll(function(result){
           res.render('todoList',{
              nav:nav,
              todos: result 
           }); 
        });
    }
    
    var getItem = function(req, res){
        
    }
    
    var createItem = function(req, res){
        
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