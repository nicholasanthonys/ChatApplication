var express = require('express');
var router = express.Router();
var conversationController = require('../controller/ConversationController');

//create new conversations
router.post('/new',function(req,res){
    conversationController.createConversation(req,res);
});

//get conversation based on id 
router.post('/chatscreen',function(req,res){

    console.log('getConversation id is ' + req.body.id);
     conversationController.getConversation(req,res);
});

//send message to a conversation
router.post('/detail',function(req,res){
    conversationController.insertMessage(req,res);
});

router.post('/listchat',function(req,res){
   conversationController.loadListChat(req,res);
});



module.exports = router;