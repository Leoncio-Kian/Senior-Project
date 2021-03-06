var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendfile(__dirname + '/WhiteBoard.html');
});

io.on('connection', function(socket){
	console.log('a user has connected');
	socket.on('whiteboard update', function(msg){
		console.log('message: ' + msg.plots[0].x + msg.plots[0].y);
		io.emit('whiteboard update', msg);
	});
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

http.listen(8080, function(){
	console.log('listening on *:8080');
});

