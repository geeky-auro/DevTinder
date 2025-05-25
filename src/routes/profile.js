const express = require("express");
const profileRouter = express.Router();
const { authJWT } = require("../../middlewares/authMiddleware");
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

module.exports = profileRouter;
