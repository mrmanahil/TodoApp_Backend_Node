const Todo = require("../models/TodoModel");

async function getAllTodos(req, res) {
  try {
    const Todos = await Todo.find();

    res.status(200).json({
      success: true,
      data: Todos,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
}

async function addTodo(req, res) {
  let content = req.body.content;

  content = content.trim();

  try {
    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Please enter some todo content",
      });
    } else {
      const newTodo = new Todo({
        content: content,
      });

      const newTodoData = await newTodo.save();

      res.status(201).json({
        success: true,
        data: newTodoData,
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
}

async function deleteTodo(req, res) {
  const id = req.params.id;
  try {
    const todoDel = await Todo.findByIdAndDelete(id);
    console.log("todo Item ==>> ", todoDel);

    if (!todoDel) {
      res.status(404).json({
        success: false,
        message: "Todo item not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Todo Deleted Successfully",
        data: todoDel,
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
}

async function updateTodo(req, res) {
  const id = req.params.id;

  const content = req.body.content;

  console.log("content =>>> ", content);
  try {
    const todoToUpdate = await Todo.findByIdAndUpdate(id, { content: content });

    if (!todoToUpdate) {
      res.status(404).json({
        success: false,
        message: "Todo item not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Todo Updated Successfully",
        data: todoToUpdate,
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
}

module.exports = { getAllTodos, addTodo, deleteTodo, updateTodo };
