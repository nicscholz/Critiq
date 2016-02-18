var mongoose = require('mongoose');

var ChatSchema = mongoose.Schema({
  username: {type: String},
  content: {type: String}
});


module.exports = mongoose.model('Chat', ChatSchema);
