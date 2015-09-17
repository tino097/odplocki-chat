var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

//var socket = io.listen(port, ip_address);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  socket.on('chat message', function(msg, username){
    io.emit('chat message', msg, username);
  });
});

http.listen(port,ip_address, function(){
  console.log('listening on *:8080');
});
