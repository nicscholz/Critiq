var express       = require('express'),
    bodyParser    = require('body-parser'),
    cookieParser  = require('cookie-parser'),
    mongoose      = require('mongoose');
    socketIo      = require('socket.io');


var app = express();

var loaduser = require('./middleware/loaduser');
var server = require('http').Server(app);
var io = socketIo(server);

app.use(express.static('./public'));
app.use( bodyParser.urlencoded({extended: true}) );
app.use( bodyParser.json() );

var morgan = require('morgan');
app.use( morgan('dev') );

 app.use(cookieParser())
 var mongoPath = 'mongodb://localhost/critiq';
 var mongoose = require('mongoose');
 mongoose.connect(process.env.MONGOLAB_URI||mongoPath);

app.use(loaduser);

 var users = require('./routers/users');
 app.use('/api/users', users);

 var chats = require('./routers/chats');
 app.use('/api/chats', chats);

 var images = require('./routers/images');
 app.use('/api/images', images);



 app.get('/', function(req, res){
  res.render( __dirname + "/views/index.ejs");
 })

io.on('connection', function(socket){
   console.log('...new connection');

   socket.on('send message', function(data){
      console.log('Data to server', data);
      io.sockets.emit('globally sent message', data);
   });
});

////////// LISTENING //////////

var port = process.env.PORT || 3000;
server.listen(port, function(){
  console.log('listening on port '+ port);
});
