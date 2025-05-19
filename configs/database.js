const moongose = require("mongoose");

const connectDB = async () => {
  await moongose.connect(
    "mongodb+srv://aurosaswatkiit25:KGgQioe4FzXCpDCn@cluster0.ayizler.mongodb.net/"
  );
};


module.exports = connectDB;
