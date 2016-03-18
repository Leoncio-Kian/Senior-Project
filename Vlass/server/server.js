
var whiteboardArray = [];

//Streamy.onConnect(function (socket) {
 // console.log('some socket connected to server!');

//});

Streamy.on('connection', function(socket){
  Streamy.on('whiteboard update', function(msg, socket) {
    //console.log('server whiteboard updated!');
    //Streamy.broadcast('whiteboard update client',msg, socket);
    whiteboardArray.push(msg);

  });
  Streamy.on('get Whiteboard', function(data, socket) {
    //console.log(data);
    //console.log(socket);
    if(whiteboardArray != null)
    Streamy.emit('initializeWhiteboard',{data: whiteboardArray}, socket);
  });
});
  classes = new MysqlSubscription('allClasses');

  Meteor.startup(function () {
    // code to run on server at startup
  });

  
  var liveDb = new LiveMysql({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'VlassDB'
  });

  var closeAndExit = function() {
    liveDb.end();
    process.exit();
  };

  process.on('SIGTERM', closeAndExit);
  process.on('SIGINT', closeAndExit);
  
  Meteor.publish('allClasses', function() {
    return liveDb.select(
      'SELECT * FROM classroom',
      [ { table: 'classroom' } ]
    );
  });

