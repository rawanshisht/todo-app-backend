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
    const { description, done } = req.body;
    const updatedFields = {};
    if (description !== undefined) {
      if (description.trim() === "" || description.length > 20) {
        return res
          .status(400)
          .json({ msg: "Please enter a value between 1 and 20 characters." });
      }
    }

    if (description && description.length > 0 && description.length <= 20) {
      updatedFields.description = description;
    }

    if (typeof done !== "undefined") {
      updatedFields.done = done;
    }
    const todo = await Todo.findOneAndUpdate({ _id: taskID }, updatedFields, {
      new: true,
      runValidators: true,
    });
    if (!todo) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    return res.status(200).json({ todo });
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
