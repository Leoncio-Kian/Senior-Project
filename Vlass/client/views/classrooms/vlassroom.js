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

var cWhiteboard;

var classid;                // the classid from the mysql database
// var canvas;                 //the canvas on the template
// var ctx;                    //the means of drawing on the canvas
var currentColor;           // the current color
var temporaryStorage;       // the temp storage of coordinates. deleted on draw

var isActive = false;       // whether the mouse can draw on canvas or not
var plotArray = [];         // the full set of coordinates
var start = 0;              // the starting point of the ctx drawling
var progress = 0;           // the variable that keeps track of the framerate.

Template.vlassroom.onRendered(function () {
  classid = this.data._id;
  cWhiteboard = new Whiteboard(this.data._id, this.find('#drawCanvas'));
  var temp;
  Meteor.call('get_whiteboard', cWhiteboard.getClassid(), function (error, response) {
    if (error) {
      console.log(error);
    } else if (response) {
      console.log('there is a response!');
      console.log(response[0]);
      for (var i = 0; i < response.length; i++) {
        drawOnCanvas(response);
      }
    }
  else {
      console.log('made it to the else statement! (what.)');
      console.log(response);
    }

  });


  Streamy.join(cWhiteboard.getClassid());

  console.log(cWhiteboard.getClassid());
  // cWhiteboard.anvas = document.getElementById('drawCanvas');
  // ctx = canvas.getContext('2d')

  cWhiteboard.getCtx().lineWidth = '3';
  cWhiteboard.getCtx().lineCap = 'round';
  cWhiteboard.getCtx().lineJoin = 'round';

  currentColor = 'blue';

  temporaryStorage = [];

  cWhiteboard.getCanvas().addEventListener('mousedown', startDraw, false);
  cWhiteboard.getCanvas().addEventListener('mousemove', draw, false);
  cWhiteboard.getCanvas().addEventListener('mouseup', endDraw, false);
});
function renderArray(whiteboardArray) {
  for (var i = 0; i < whiteboardArray.length; i++) {
    drawOnCanvas(whiteboardArray[i]);
  }
}




function drawOnCanvas(pArray) {

  for (var j = 0; j < pArray.length; j++) {
    cWhiteboard.getCtx().strokeStyle = pArray[j].color;
    cWhiteboard.getCtx().beginPath();
    cWhiteboard.getCtx().moveTo(pArray[j].plots[0].x, pArray[j].plots[0].y);

    for (var i = 0; i < pArray[j].plots.length; i++) {
      cWhiteboard.getCtx().lineTo(pArray[j].plots[i].x, pArray[j].plots[i].y);
    }
    cWhiteboard.getCtx().stroke();
  }



}

Streamy.on('whiteboard_update', function (msg) {
  if (!msg) return;
  plotArray.push(msg);
    // setupDraw(currentColor);
  drawOnCanvas(plotArray);
  plotArray = [];
    // finishDraw();
    // setupDraw(currentColor);
});


function draw(e) {
  if (!isActive) return;

  if (start == 0) start = Date.now();
  progress = Date.now() - start;
  updateArray(e);
  if (progress > 50) {
    plotArray.push({ 'color': currentColor, 'plots': temporaryStorage });

    drawOnCanvas(plotArray);
    Streamy.rooms(cWhiteboard.getClassid()).emit('whiteboard_update', { 'color': currentColor, 'plots': temporaryStorage });

    Meteor.call('set_whiteboard', cWhiteboard.getClassid(), { 'plots': temporaryStorage });
    console.log('makes it here!');
    plotArray = [];
    temporaryStorage = [];
    start = 0;
    progress = 0;
  }

}

function updateArray(e) {
  var x = e.offsetX || e.layerX - cWhiteboard.getCanvas().offsetLeft;
  var y = e.offsetY || e.layerY - cWhiteboard.getCanvas().offsetTop;

  // socket.emit('whiteboard update', {'color': color, 'plots': plotLine, plotArray: plotArray});

  temporaryStorage.push({ x: x, y: y });

}

function startDraw(e) {
  isActive = true;
}

function endDraw(e) {
  isActive = false;
  plotArray.push({ 'color': currentColor, 'plots': temporaryStorage });
  drawOnCanvas(plotArray);
  temporaryStorage = [];
  plotArray = [];
}


