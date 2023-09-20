const express = require("express");
const app = express();
const todos = require("./Routes/todoRoutes");

app.use(express.json());

//routes
app.use("/todos", todos);

const port = 3000;

app.listen(port, console.log(`Server is listening on port ${port}...`));
