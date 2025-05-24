const moongose = require("mongoose");

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

const userModel = moongose.model("User", userSchema);
module.exports = userModel;
