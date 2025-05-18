const express = require("express");

const app = express();
const PORT = 3000;

app.use("/", (req, res) => {
  res.send("Hello Buddy :0");
});

app.use("/dashboard", (req, res) => {
  res.send("Hello from the DashBoard!");
});

app.use("/test", (req, res) => {
  res.send("Hello from the server!");
});

app.listen(PORT, () => {
  // This will only be executed when our server has started successfully
  console.log("Server is running on port 3000");
});
