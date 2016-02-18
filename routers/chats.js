var express = require('express');
var router = express.Router();
var Chat = require('../models/chat')

router.post('/', function (req, res) {
  var chatData = req.body.chat;
  var newChat = new Chat(chatData)
  newPost.save(function (err, dbChat) {
    res.json( dbChat );
  })
})
router.get('/', function (req, res) {
  dbChats = Chat.all;
  Chat.find({}, function(err, dbChats){
      res.json( {chats: dbChats} );
    });
});

module.exports = router;
