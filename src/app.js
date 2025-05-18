const express = require("express");

const app = express();
const PORT = 3000;

// app.use("/", (req, res) => {
//   res.send("Hello Buddy :0");
// });

app.use("/dashboard", (req, res) => {
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
    res.send("Data saved to the Database");
  });


  app.delete("/users", (req, res) => {
    res.send("Data Deleted Successfully");
  });

app.listen(PORT, () => {
  // This will only be executed when our server has started successfully
  console.log("Server is running on port 3000");
});
