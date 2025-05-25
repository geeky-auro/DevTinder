const express = require("express");
const User = require("../../models/user");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
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

authRouter.get("/login", async (req, res) => {
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

module.exports = authRouter;
