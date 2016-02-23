lineStream = new Meteor.Stream('lines');

lineStream.permissions.write(function() {
	return true;
})

lineStream.permissions.read(function() {
	return true;
})