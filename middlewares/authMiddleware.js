const jwt = require("jsonwebtoken");
const User = require("../models/user");
const adminAuth = (req, res, next) => {
  if (req.body?.auth === "aeiou") {
    console.log("User is authenticated ;)");
    next();
  } else {
    res.status(400).send("Unauthorized Access!");
  }
};

const userAuth = (req, res, next) => {
  if (req.body?.auth === "user-authenticated") {
    console.log("User is authenticated ;)");
    next();
  } else {
    res.status(400).send("Unauthorized Access!");
  }
};

const authJWT = async (req, res, next) => {
  try {
    // Get the cookies
    const cookies = req.cookies;
    // Get the token from the cookies
    const { token } = cookies;
    // Get the ID from the token with the help of a jwt lib
    const decodedMessage = await jwt.verify(token, "DEV@Tinder$790");
    // Validate the ID whether a respective user exist or not
    const { _id } = decodedMessage;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User doesnt exist");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
  // If it is there then do a next call else throw a Error
};

module.exports = {
  adminAuth,
  userAuth,
  authJWT,
};
