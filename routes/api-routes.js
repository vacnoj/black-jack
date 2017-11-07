
var db = require("./../models");

module.exports = function(app) {

// homepage route
  app.get("/", function(req, res) {
    
      
      res.json(results);
    });
    // orm.getTodos(function(results) {
      // res.json(results);
    // });
  });

  // POST route for saving a new todo. We can create a todo using the data on req.body
  app.post("/api/todos", function(req, res) {
    // orm.addTodo(req.body, function(results) {
    //   res.json(results);
    console.log(req.body);
    db.Todo.create({
      text: req.body.text,
      complete: req.body.complete
    }).then(function(results) {
      res.json(results);
    })
    // });
  });

  // DELETE route for deleting todos. We can access the ID of the todo to delete in
  // req.params.id
  app.delete("/api/todos/:id", function(req, res) {
    // orm.deleteTodo(req.params.id, function(results) {
    //   res.json(results);
    // });
    db.Todo.destroy({
      where : {
        id :req.params.id
      }
      }).then(function(results) {
        res.json(results);
      });
  });

  // PUT route for updating todos. We can access the updated todo in req.body
  app.put("/api/todos", function(req, res) {
    // orm.editTodo(req.body, function(results) {
    //   res.json(results);
    // });
    db.Todo.update(
      {text: req.body.text,
        complete: req.body.complete
      }, {where : {
        id: req.body.id
      }
    }
    ).then(function(results) {
      res.json(results);
    })
  });
};
