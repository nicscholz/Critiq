var mongoose = require('mongoose');

var ImageSchema = mongoose.Schema({
  imgurl: {type: String}
});

module.exports = mongoose.model('Image', ImageSchema);
