var whiteboardArray = [];

Streamy.onConnect(function (socket) {
  console.log('some socket connected to server!');

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
  'set_whiteboard': function (classid, plotArray) {

    console.log(classid);
    if (!classid) {
      console.log('the classid doesn\'t exist!');
    }
    else if (!plotArray) {
      console.log(plotArray);
      console.log('the array doesn\'t exist!');

    } else if (!whiteboardArray[classid]) {
      console.log('creating first entry in whiteboard array');
      whiteboardArray[classid] = [];
      whiteboardArray[classid].push(plotArray);
    }
    else {
      whiteboardArray[classid].push(plotArray);
      // console.log(whiteboardArray[classid]);
    }
  },
  'clear_whiteboard': function (classid) {
    whiteboardArray[classid] = [];
    console.log('whiteboard has been cleared!');
  }
});
