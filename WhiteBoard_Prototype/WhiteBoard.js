var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var whiteboardArray = [];

app.get('/', function(req, res){
	res.sendfile(__dirname + '/WhiteBoard.html');
});

io.on('connection', function(socket){
	console.log('a user has connected');
	console.log(socket.id);
	io.emit('initializeWhiteboard', whiteboardArray);

	socket.on('whiteboard update', function(msg){
		whiteboardArray[socket.id] = msg.plotArray;
		//console.log('message: ' + msg.plots.startLoc + msg.plots.endLoc);
		io.emit('whiteboard update', msg);
	});
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

http.listen(8080, function(){
	console.log('listening on *:8080');
});

