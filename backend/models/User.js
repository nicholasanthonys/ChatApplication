const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
  },
  email : {
    type : String,
  },
  password: {
    type: String,
  },
  conversations: {
    type: Array,
  },
  friendsListUsername: {
    type: Array,
  },
});

var User = mongoose.model("User", UserSchema);

module.exports = User;
