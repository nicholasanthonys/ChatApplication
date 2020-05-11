var express = require('express');
var router = express.Router();
var conversationController = require('../controller/ConversationController');

//create new conversations
router.post('/new',function(req,res){
    conversationController.createConversation(req,res);
});

//get conversation based on id 
router.get('/:id',function(req,res){
    console.log('getConversation id is ' + req.params.id);
    conversationController.getConversation(req,res,req.params.id);
});

//send message to a conversation
router.post('/:id',function(req,res){
    conversationController.insertMessage(req,res,req.params.id);
});



module.exports = router;