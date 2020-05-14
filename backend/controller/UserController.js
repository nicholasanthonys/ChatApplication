var User = require("../models/User");

async function isUsernameExist(username) {
  var user = await User.findOne({ username: username });

  if (user) {
    return true;
  }

  return false;
}

//post /login
function getUser(req, res) {
  User.findOne(
    { email: req.body.email, password: req.body.password },
    function (err, user) {
      if (err) {
        res.status(301).send({
          user: null,
        });
      }
      res.status(201).send({
        status: "success",
        user: user,
      });
    }
  );
}

//post : /register
async function insert(req, res) {
  try {
    //check if username is exist
    let isUserExist = false;
    isUserExist = await isUsernameExist(req.body.username);
    if (isUserExist) {
      res.status(201).send({
        status: "failed",
        message: "username already exist",
      });
    } else {
      var newUser = new User();
      newUser.username = req.body.username;
      newUser.password = req.body.password;
      newUser.email = req.body.email;
      //default picture
      newUser.picture = "https://cdn.vuetifyjs.com/images/lists/5.jpg";
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

function getOtherUser(req, res) {
  User.findOne(
    { username: req.body.username },
    "username picture",
    (err, data) => {
      if (!err) {
        res.status(201).send(data);
      }
    }
  );
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

  isUsernameExist,
  insert,
  getUser,
  getOtherUser,
};
