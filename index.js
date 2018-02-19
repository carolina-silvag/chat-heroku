
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var userConnected = [];
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/modules', express.static(__dirname + '/node_modules'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('login', function(userName){
    userConnected.push(userName);
    this.userName = userName;
    io.emit('updateUser', userConnected);
  });
  socket.on('chat message', function(param){
    io.emit('chat message', param);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected', this.userName);
    var i = userConnected.indexOf(this.userName);
    if (i >= 0) {
      userConnected.splice(i, 1);
    }
    io.emit('updateUser', userConnected);
  });
  socket.on('logout', function(userName){
    console.log('user logout', userName);
    var i = userConnected.indexOf(userName);
    if (i >= 0) {
      userConnected.splice(i, 1);
    }
    io.emit('updateUser', userConnected);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
