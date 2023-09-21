const Todo = require("../Models/todo");

const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTodo = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const todo = await Todo.findOne({ _id: taskID });
    if (!todo) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ todo });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const addTodo = async (req, res) => {
  try {
    if (
      req.body.description.length !== 0 &&
      req.body.description.length <= 20
    ) {
      const todo = await Todo.create(req.body);
      return res.status(201).json({ todo });
    } else {
      return res
        .status(400)
        .json({ msg: `Please enter a value between 1 and 20 characters.` });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    // Check if this is a done update
    if (req.body && typeof req.body.done !== "undefined") {
      const todo = await Todo.findOneAndUpdate(
        { _id: taskID },
        { done: req.body.done },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!todo) {
        return res.status(404).json({ msg: `No task with id: ${taskID}` });
      }
      return res.status(200).json({ todo });
    } else if (
      req.body &&
      req.body.description.length !== 0 &&
      req.body.description.length <= 20 &&
      req.body.description.trim() !== ""
    ) {
      const todo = await Todo.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true,
      });

      if (!todo) {
        return res.status(404).json({ msg: `No task with id: ${taskID}` });
      }
      return res.status(200).json({ todo });
    } else if (
      req.body.description.length === 0 ||
      req.body.description.length > 20
    ) {
      return res
        .status(400)
        .json({ msg: `Please enter a value between 1 and 20 characters.` });
    } else {
      // If neither description nor status update, return a bad request response
      return res.status(400).json({ msg: "Invalid update request." });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const todo = await Todo.findOneAndDelete({ _id: taskID });
    if (!todo) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
