const validator = require("validator");
const validateProfileData = (req) => {
  const allowedEdits = {
    FIRST_NAME: "firstName",
    LAST_NAME: "lastName",
    AGE: "age",
    GENDER: "gender",
  };

  const allowedFields = Object.values(allowedEdits);

  const isAllowed = Object.keys(req.body).every((key) =>
    allowedFields.includes(key)
  );

  return isAllowed;
};

module.exports = {
  validateProfileData,
};
