const getAllTodos = (req, res) => {
  res.send("all items");
};

const getTodo = (req, res) => {
  res.json({ id: req.params.id });
};
const addTodo = (req, res) => {
  res.json(req.body);
};

const updateTodo = (req, res) => {
  res.send("update todo");
};

const deleteTodo = (req, res) => {
  res.send("delete todo");
};

module.exports = {
  getAllTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
};
