var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var nsp = io.of('/some-namespace');

var whiteboardArray = [];

app.get('/', function(req, res){
	res.sendFile(__dirname + '/WhiteBoard.html');
});

nsp.on('connection', function(socket){
	console.log('a user has connected');
	console.log(socket.id);
	nsp.emit('initializeWhiteboard', whiteboardArray);

	socket.on('whiteboard update', function(msg){
		socket.broadcast.emit('whiteboard update', msg);
		whiteboardArray.push(msg);
	});
	socket.on('disconnect', function(){
		console.log('user disconnected');		
	});
	socket.on('updateArray', function(msg){
		whiteboardArray[socket.id].push(msg);
	})
});

http.listen(8080, function(){
	console.log('listening on *:8080');

});

