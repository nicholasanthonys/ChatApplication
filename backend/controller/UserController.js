var User = require("../models/User");
var socket = require("../database/socket");

async function isUsernameExist(username) {
  var user = await User.findOne({ username: username });

  if (user) {
    return true;
  }

  return false;
}

//post : /register
async function insert(req, res) {
  try {
    let isUserExist = false;
    isUserExist = await isUsernameExist(req.body.username);
    if (isUserExist) {
      res.send("user exist");
    } else {
      var newUser = new User();
      newUser.username = req.body.username;
      newUser.password = req.body.password;
      newUser.conversations = [];
      newUser.friendListUsername = [];
      await newUser.save((err) => {
        if (!err) {
          res.status(201).send({
            status: "register berhasil",
            newUser: newUser,
          });
        } else {
          res.send("Insert gagal\n" + err);
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.send("error is exist");
  }
}

module.exports = {
  // username: {
  //     type: String,
  //   },
  //   password: {
  //     type: String,
  //   },
  //   conversations: {
  //     type: Array,
  //   },
  //   friendsListUsername: {
  //     type: Array,
  //   },

  isUsernameExist: isUsernameExist,
  insert: insert,
};
