const express = require("express");
const profileRouter = express.Router();
const { authJWT, userAuth } = require("../../middlewares/authMiddleware");
const { validateProfileData } = require("../utils/validation");
const User = require("../../models/user");
profileRouter.get("/profile", authJWT, async (req, res) => {
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

profileRouter.patch("/profile/edit/:email", authJWT, async (req, res) => {
  try {
    if (!validateProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const email = req.params?.email;
    const user = req.user;

    const updatedInfo = req.body;
    // Map user updatedInfo to user object ;)
    Object.entries(updatedInfo).forEach((x) => {
      user[x[0]] = x[1];
    });
    // const updatedUser_ = { ...user, ...updatedInfo }; ==> Moongose Object will not return a clean object ;)

    const filter = { email: email };
    const options = {
      new: true,
      runValidators: true,
    };
    const updatedUser = await User.findOneAndUpdate(
      filter,
      { $set: updatedUser_ },
      options
    );
    res.json(updatedUser);
    // res.json(...here you pass ;))
    // res.status(200).send("Profile Updated Successfully");
  } catch (err) {
    res.status(400).send("ERR:" + err.message);
  }
});

// Write logic for forgot password API ;)
profileRouter.patch("/forgotPwd/:email", authJWT, async (req, res) => {
  try {
    const email = req.params.email;
    // Req body will contain two fields oldPassword and newPassword
    const user = req.user;
    // First check whether the old passwords matches for the email passed in the path params
    if (req.body?.oldPassword !== user["password"]) {
      throw new Error("Old Password doesnt match");
    }
    const filter = { email: email };
    const options = {
      new: true,
      runValidators: true,
    };
    // Then update it's old password with new Password
    const updatedUser = await User.findOneAndUpdate(
      filter,
      { $set: { password: req.body?.newPassword } },
      options
    );
    res.status(200).send("Password Updated Successfully");
  } catch (err) {}
});

module.exports = profileRouter;
