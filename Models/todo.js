const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Must provide a name"],
    trim: true,
    maxlength: [20, "Name cannot be more than 20 characters"],
  },
  done: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
