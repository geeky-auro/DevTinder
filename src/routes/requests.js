const express = require("express");
const requestRouter = express.Router();
const { authJWT } = require("../../middlewares/authMiddleware");

requestRouter.post(
  "/sendingConnectionRequest",
  authJWT,
  async (req, res) => {}
);

module.exports = requestRouter;
