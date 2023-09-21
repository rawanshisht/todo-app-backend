const express = require("express");
const app = express();
const cors = require("cors"); // Import the 'cors' package
const todos = require("./Routes/todoRoutes");
const connectDB = require("./db/connect");
require("dotenv").config();

app.use(express.json());
app.use(cors());
//routes
app.use("/todos", todos);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
