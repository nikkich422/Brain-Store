const mongoose = require("mongoose");
const URI =
  "mongodb+srv://nikkichaurasia422:nikkichaurasia422@cluster0.kjhbl3v.mongodb.net/online";
const DB = () => {
  mongoose
    .connect(URI)
    .then(() => {
      console.log("your mongodb Connected ");
    })
    .catch((err) => console.log("Db Connection Failed " + err));
};
module.exports = DB;
