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

module.exports = {
  adminAuth,
  userAuth,
};
