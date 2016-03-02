var whiteboardArray = [];

Streamy.onConnect(function (socket) {
  console.log('some socket connected to server!');

});


Streamy.on('whiteboard update server', function(msg, socket) {
  //console.log('server whiteboard updated!');
  Streamy.broadcast('whiteboard update client',msg, socket);
  whiteboardArray.push(msg);

});
Streamy.on('get Whiteboard', function(data, socket) {
  //console.log(data);
  //console.log(socket);
  if(whiteboardArray != null)
  Streamy.emit('initializeWhiteboard',{data: whiteboardArray}, socket);
});