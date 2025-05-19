const express = require("express");
const { adminAuth, userAuth } = require("../middlewares/authMiddleware");
const app = express();
const connectDB = require("../configs/database");
const User = require("../models/user");
const PORT = 3000;

// app.use("/", (req, res) => {
//   res.send("Hello Buddy :0");
// });

app.post("/signup", async (req, res) => {
  const userObj = new User({
    firstName: "Auro",
    lastName: "Saswat Raj",
    emailId: "miitraj07@gmail.com",
    password: "Auro@123",
  });
  try {
    await userObj.save();
    res.send("User added Successfully");
  } catch (err) {
    res
      .status(500)
      .send("Something went wrong, Please check with the dev team!");
  }
});

app.use(express.json()); // For parsing application/json
connectDB()
  .then(() => {
    console.log("Database connected Established");
    app.listen(PORT, () => {
      // This will only be executed when our server has started successfully
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Error Occoured : ", err);
  });
