var express = require('express');
var router = express.Router();
var conversationController = require('../controller/ConversationController');

router.post('/insert',function(req,res){
    conversationController.insert(req,res);
});

router.get('/',conversationController.readAll);

module.exports = router;