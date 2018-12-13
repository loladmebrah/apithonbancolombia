const express = require('express'); 
const EventEmmitter = require('events');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mainSocket = new EventEmmitter();

mainSocket.on('DRAWAUCTIONS', function(info){
	io.emit('DRAWAUCTIONS',info);
});

mainSocket.on('RETURNCLIENT', function(info){
	io.emit('RETURNCLIENT',info);
});

app.use(express.static(__dirname+'/Vistas'));
app.get('/', function(req, res){
  res.sendFile(__dirname + '/Vistas/subastas.html','binary');
});


io.on('connection', function(socket){
      socket.on('ASKDEBTORS', function(){
      	  console.log("asking for debtors");
          mainSocket.emit('GETDEBTORS');
      });

      socket.on('ASKCLIENTDATA', function(id){
      	  console.log("asking client data");
          mainSocket.emit('GETACCOUNTINFO', id);
      });

});

http.listen(4242, function(){
  console.log('listening on Server_Address:4242');
});

module.exports = {
	emitter: mainSocket
}



