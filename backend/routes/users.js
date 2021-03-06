var express = require("express");
var router = express.Router();
var userController = require("../controller/UserController");
var app = express();

/* GET users listing. */
router.get("/", (req, res) => {
  console.log("get method users");
});

router.post("/login",  function(req,res){
  userController.getUser(req,res);
});


router.post("/register",  function(req,res){
    userController.insert(req,res);
});

//utk get user di list chat, return username, picture
router.post("/getotheruser", function(req,res){
  userController.getOtherUser(req,res);
});


module.exports = router;
