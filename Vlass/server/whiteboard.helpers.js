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

Meteor.methods({
  'get_whiteboard': function (classid) {
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

    console.log(classid);
    if(!classid){
      console.log('the classid doesn\'t exist!');
    }
    else if(!canvas) {
      console.log(canvas);
      console.log('the canvas doesn\'t exist!');

    } else if(!whiteboardArray[classid]){
      console.log('creating first entry in whiteboard array');
      whiteboardArray[classid] =  [canvas];
    }
    else {
      whiteboardArray[classid].push(canvas);
      //console.log(whiteboardArray[classid]);
    }
  }
})