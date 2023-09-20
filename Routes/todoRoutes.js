const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todosControllers");

router.route("/").get(getAllTodos).post(addTodo);
router.route("/:id").get(getTodo).patch(updateTodo).delete(deleteTodo);

module.exports = router;
