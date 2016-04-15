
import './whiteboard.css';
import './whiteboard.view.html';
import { Whiteboard } from './module/wb.js';

Meteor._debug = (function (super_meteor_debug) {
  return function (error, info) {
    if (!(info && _.has(info, 'msg')))
      super_meteor_debug(error, info);
  };
})(Meteor._debug);

/*
function Whiteboard(outerclassid, outercanvas) {

  var classid = outerclassid;
  var ctx = outercanvas.getContext('2d');
  var canvas = outercanvas;

  return {
    'getCanvas': function () {
      return canvas;
    },
    'getCtx': function () {
      return ctx;
    },
    'getClassid': function () {
      return classid;
    },
    'updateCanvas': function (newCanvas) {
      canvas = newCanvas;
      ctx = newCanvas.getContext('2d');
    }


  };
}
*/
var cWhiteboard;
var whiteboardRoom;


Template.whiteboard.onCreated(function () {
  //Session.set("classid", this.data._id);
  whiteboardRoom = "whiteboard " + this.data._id;
  console.log(Session.get("socketid"));
})


Template.whiteboard.onRendered(function () {
  cWhiteboard = new Whiteboard(this.find('#drawCanvas'));
  var temp;
  Meteor.call('get_whiteboard', Session.get("classid"), function (error, response) {
    if (error) {
      console.log(error);
    } else if (response) {
      console.log('there is a response!');
      console.log(response);
      cWhiteboard.initializeWhiteboard(response);

    }
    else {
      console.log('server side had no data for this whiteboard');
      console.log(response);
    }

  });

  // console.log(cWhiteboard.getClassid() + 'something');
  //Streamy.join(whiteboardRoom);
  console.log(whiteboardRoom);
  //
  // console.log(cWhiteboard.getClassid());
  // // cWhiteboard.anvas = document.getElementById('drawCanvas');
  // // ctx = canvas.getContext('2d')
  //
  // cWhiteboard.getCtx().lineWidth = '3';
  // cWhiteboard.getCtx().lineCap = 'round';
  // cWhiteboard.getCtx().lineJoin = 'round';
  //
  // currentColor = 'blue';
  //
  // temporaryStorage = [];
  //
  // cWhiteboard.getCanvas().addEventListener('mousedown', startDraw, false);
  // cWhiteboard.getCanvas().addEventListener('mousemove', draw, false);
  // cWhiteboard.getCanvas().addEventListener('mouseup', endDraw, false);
});
// function renderArray(whiteboardArray) {
//   for (var i = 0; i < whiteboardArray.length; i++) {
//     drawOnCanvas(whiteboardArray[i]);
//   }
// }


Window.emitUpdate = function (currentColor, currentLineWidth, plots) {
  console.log('inside window emit!');
  Streamy.rooms(Session.get("socketid")).emit('whiteboard_update', {
    'color': currentColor,
    'linewidth': currentLineWidth,
    'plots': plots
  });
}

Window.emitClear = function (currentColor, plots) {
  console.log('inside window emit!');

}

// function drawOnCanvas(pArray) {
//
//   for (var j = 0; j < pArray.length; j++) {
//     cWhiteboard.getCtx().strokeStyle = pArray[j].color;
//     cWhiteboard.getCtx().beginPath();
//     cWhiteboard.getCtx().moveTo(pArray[j].plots[0].x, pArray[j].plots[0].y);
//
//     for (var i = 0; i < pArray[j].plots.length; i++) {
//       cWhiteboard.getCtx().lineTo(pArray[j].plots[i].x, pArray[j].plots[i].y);
//     }
//     cWhiteboard.getCtx().stroke();
//   }
//
//
//
// }
Template.whiteboard.events({
  'click #clear_button': function () {
    console.log('clear button clicked.');
    cWhiteboard.clearWhiteboard(true);
    Streamy.rooms(Session.get("socketid")).emit('whiteboard_clear', {'clear': true });
    Meteor.call('clear_whiteboard', Session.get("classid"));
  },
  'click #erase_button': function () {
    console.log('erase button clicked.');
    cWhiteboard.setColor('white');
    cWhiteboard.setLineWidth('5');
  },
  'click #blue_button': function () {
    console.log('blue button clicked.');
    cWhiteboard.setColor('blue');
    cWhiteboard.setLineWidth('3');
  },
  'click #black_button': function () {
    console.log('black button clicked.');
    cWhiteboard.setColor('black');
    cWhiteboard.setLineWidth('3');
  }
});


Streamy.on('whiteboard_update', function (msg) {
  console.log('dawg pls', msg.__from);
  cWhiteboard.updateWhiteboard(msg);

});

Streamy.on('whiteboard_clear', function (msg) {
  cWhiteboard.clearWhiteboard(msg.clear);

});
Template.whiteboard.onDestroyed(function () {
  //Streamy.leave(Session.get("socketid"));
});


/*
//    console.log("outer streamy whiteboard update firing!");
*/
// //   if (!msg) return;
// //   plotArray.push(msg);
// //   // setupDraw(currentColor);
// //   drawOnCanvas(plotArray);
// //   plotArray = [];
// //   // finishDraw();
// //   // setupDraw(currentColor);
// });

//
// function draw(e) {
//   if (!isActive) return;
//
//   if (start == 0) start = Date.now();
//   progress = Date.now() - start;
//   updateArray(e);
//   if (progress > 50) {
//     var hold = temporaryStorage;
//     temporaryStorage = [];
//     plotArray.push({ 'color': currentColor, 'plots': hold });
//
//     drawOnCanvas(plotArray);
//     Streamy.rooms('whiteboard ' + cWhiteboard.getClassid()).emit('whiteboard_update', { 'color': currentColor, 'plots': hold });
//
//     Meteor.call('set_whiteboard', cWhiteboard.getClassid(), { 'plots': hold });
//     console.log('makes it here!');
//     plotArray = [];
//     //temporaryStorage = [];
//     start = 0;
//     progress = 0;
//   }
//
// }
//
// function updateArray(e) {
//   var x = e.offsetX || e.layerX - cWhiteboard.getCanvas().offsetLeft;
//   var y = e.offsetY || e.layerY - cWhiteboard.getCanvas().offsetTop;
//
//
//   temporaryStorage.push({ x: x, y: y });
//
//
//
// }
//
// function startDraw(e) {
//   isActive = true;
// }
//
// function endDraw(e) {
//   isActive = false;
//   plotArray.push({ 'color': currentColor, 'plots': temporaryStorage });
//   drawOnCanvas(plotArray);
//   temporaryStorage = [];
//   plotArray = [];
// }