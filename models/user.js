const moongose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new moongose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

// Offload JWT token creation in handler method and not during the time of authentication
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
    expiresIn: "1d",
  });
  return token;
};

const userModel = moongose.model("User", userSchema);
module.exports = userModel;
