const mongoose = require("mongoose");
const moment = require("moment");

const TodoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Must provide a name"],
    trim: true,
    maxlength: [20, "Name cannot be more than 20 characters"],
    minlength: [1, "Name cannot be empty"],
  },
  done: {
    type: Boolean,
    default: false,
  },
  date: {
    type: String,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
