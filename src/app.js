const express = require("express");
const {
  adminAuth,
  userAuth,
  authJWT,
} = require("../middlewares/authMiddleware");
const app = express();
const connectDB = require("../configs/database");
const User = require("../models/user");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
// app.use("/", (req, res) => {
//   res.send("Hello Buddy :0");
// });

app.post("/signup", async (req, res) => {
  const userObj = new User(req.body);
  try {
    await userObj.save();
    res.send("User added Successfully");
  } catch (err) {
    res
      .status(500)
      .send("Something went wrong, Please check with the dev team!");
  }
});

app.get("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    // TODO: Add a password validator as well ;)
    if (password) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 36000000),
      });
      res.send("Login Successful!!");
    }
  } catch (err) {
    res.status(500).send("ERROR: " + err.message);
  }
});

app.get("/profile", authJWT, async (req, res) => {
  // Inorder to read cookies we need to use an express recommended Middleware  called cookie-parser
  try {
    const user = req.user;
    if (!user) {
      throw new Error(`User doesn't exist`);
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(501).send(err.message);
  }
});

app.post("/sendingConnectionRequest", authJWT, async (req, res) => {});

//Always place more specific routes before dynamic routes (:param) in Express.
app.get("/user/feed", async (req, res) => {
  console.log(await User.countDocuments({}));
  const documents = await User.find({});
  console.log(documents);
  res.status(200).send(documents);
});

app.get("/user/:email", async (req, res, next) => {
  const email = req.params?.email;
  const userObj = await User.findOne({ email: email });
  console.log(userObj);
  res.status(200).send(userObj);
});

// Delete user by id ;)
app.delete("/user/:id", async (req, res) => {
  try {
    const userId = req.params?.id;
    const result = await User.findByIdAndDelete(userId);

    if (!result) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "User deleted", user: result });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error deleting user" });
  }
});

app.patch("/user/update/:email", async (req, res) => {
  try {
    const email = req.params?.email;
    const updatedBody = req.body;
    console.log(updatedBody);
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      updatedBody,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "User updated", user: updatedUser });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Something wen't wrong while updating!" + err });
  }
});
app.get("/user/id/:id", async (req, res) => {
  const _id = req?.params;
  const documents = await User.find({ _id: _id });
  res.status(200).send(documents);
});

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
