const express = require("express");

const bodyParser = require("body-parser");

const router = express.Router();

const TodoController = require("../controllers/TodoController");

router.get("/todos/getAll", TodoController.getAllTodos);

router.post("/todos/addTodo", bodyParser.json(), TodoController.addTodo);

router.put(
  "/todos/update/:id",
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  TodoController.updateTodo
);

router.delete(
  "/todos/delete/:id",
  bodyParser.urlencoded({ extended: true }),
  TodoController.deleteTodo
);

module.exports = router;
