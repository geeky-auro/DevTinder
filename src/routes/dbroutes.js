const express = require("express");
const dbRouters = express.Router();
const User = require("../../models/user");

//Always place more specific routes before dynamic routes (:param) in Express.
dbRouters.get("/user/feed", async (req, res) => {
  console.log(await User.countDocuments({}));
  const documents = await User.find({});
  console.log(documents);
  res.status(200).send(documents);
});

dbRouters.get("/user/:email", async (req, res, next) => {
  const email = req.params?.email;
  const userObj = await User.findOne({ email: email });
  console.log(userObj);
  res.status(200).send(userObj);
});

// Delete user by id ;)
dbRouters.delete("/user/:id", async (req, res) => {
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

dbRouters.patch("/user/update/:email", async (req, res) => {
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
dbRouters.get("/user/id/:id", async (req, res) => {
  const _id = req?.params;
  const documents = await User.find({ _id: _id });
  res.status(200).send(documents);
});

module.exports = dbRouters;
