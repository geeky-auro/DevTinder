const express = require("express");
const { adminAuth, userAuth } = require("../middlewares/authMiddleware");
const app = express();
const PORT = 3000;

// app.use("/", (req, res) => {
//   res.send("Hello Buddy :0");
// });
app.use(express.json()); // For parsing application/json

app.use("/user/login", userAuth);
app.use("/users", userAuth);
app.use("/admin", adminAuth);

app.use("/admin/dashboard", (req, res) => {
  console.log(req.path);
  res.send("Hello from the DashBoard!" + " " + req.path);
});

app.use("/test", (req, res) => {
  res.send("Hello from the server!");
});

app.get("/users", (req, res) => {
  res.send({ firstName: "Auro", lastName: "Raj" });
});

app.post("/users", (req, res) => {
  try {
    throw new Error("Error bro, go back ;)");
    res.send("Data saved to the Database");
  } catch (e) {
    res.status(500).send("Something went wrong !");
  }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Error has occoured !");
  }
});

app.delete("/users", (req, res) => {
  res.send("Data Deleted Successfully");
});

app.listen(PORT, () => {
  // This will only be executed when our server has started successfully
  console.log("Server is running on port 3000");
});
