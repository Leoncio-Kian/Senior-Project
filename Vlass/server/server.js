
var whiteboardArray = [];

Streamy.onConnect(function (socket) {
 console.log('some socket connected to server!');

});


  Streamy.on('whiteboard_update', function(msg, socket) {
    console.log('server whiteboard updated!');
    //Streamy.broadcast('whiteboard update client',msg, socket);
    whiteboardArray.push(msg);

  });
  Streamy.on('get_Whiteboard', function(data, socket) {
    console.log(data);
    //console.log(socket);
    if(whiteboardArray != null)
    Streamy.emit('initialize_Whiteboard',{data: whiteboardArray}, socket);
  });  

  classes = new MysqlSubscription('allClasses');

  Meteor.startup(function () {
    // code to run on server at startup
  });

  
  var liveDb = new LiveMysql({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '6882907',
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

Meteor.methods({
  'get_whiteboard' : function (classid) {
    if (!classid) {
      console.log('the classid doesn\'t exist!');
      return null;
    }
    else if (!whiteboardArray[classid]) {

      console.log('the whiteboard did not exist yet!');
      return null;
    }
    else {
      return whiteboardArray[classid];
    }




  },
  'set_whiteboard': function (classid, canvas) {
    if(!classid){
      console.log('the classid doesn\'t exist!');
    }
    else if(!canvas){
      console.log('the canvas doesn\'t exist!');

    }
    else {
      whiteboardArray[classid] = canvas;
    }
  }
});

