lineStream = new Meteor.Stream('lines');

var whiteboardArray = [];

lineStream.permissions.write(function() {
	return true;
});

lineStream.permissions.read(function() {
	return true;
});


	lineStream.on('getWhiteboard', function () {
		lineStream.emit('initializeWhiteboard', whiteboardArray);
	});
	

	lineStream.on('whiteboard update', function(msg) {
		whiteboardArray.push(msg);
	});

