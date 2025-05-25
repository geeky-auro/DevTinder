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
const authRouter = require("../src/routes/auth");
const requestRouter = require("../src/routes/requests");
const profileRouter = require("../src/routes/profile");
const dbRouters = require("./routes/dbroutes");
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());
// app.use("/", (req, res) => {
//   res.send("Hello Buddy :0");
// });

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", dbRouters);

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
