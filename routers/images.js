var express = require('express');
var router = express.Router();
var image = require('../models/image')

router.post('/', function (req, res) {
  var imageData = req.body.image;
  var newImage = new Image(imageData)
  newPost.save(function (err, dbImage) {
    res.json( dbChat );
  })
})
router.get('/', function (req, res) {
  dbImages = Chat.all;
  Image.find({}, function(err, dbImages){
      res.json( {images: dbImages} );
    });
});

module.exports = router;
