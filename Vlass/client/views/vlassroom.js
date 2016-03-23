function Whiteboard(classid, canvas, ctx) {
  this.classid = classid;
  this.canvas = canvas;
  this.ctx = ctx;
}
var Whiteboards = [];

var classid;                //the classid from the mysql database
var canvas;                 //the canvas on the template
var ctx;                    //the means of drawing on the canvas
var currentColor;           //the current color
var temporaryStorage;       //the temp storage of coordinates. deleted on draw

var isActive = false;       //whether the mouse can draw on canvas or not
var plotArray = [];         //the full set of coordinates 
var start = 0;              //the starting point of the ctx drawling
var progress = 0;           //the variable that keeps track of the framerate.

Template.vlassroom.onRendered(function () {
  Whiteboards.push(new Whiteboard(this.data._id, document.getElementById('drawCanvas'),))
  classid = this.data._id;
  Streamy.join(classid);

  console.log(classid);
  canvas = document.getElementById('drawCanvas');
  ctx = canvas.getContext('2d');
       
  ctx.lineWidth = '3';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';3

  currentColor = 'blue';

  temporaryStorage = [];

  canvas.addEventListener('mousedown', startDraw, false);
  canvas.addEventListener('mousemove', draw, false);
  canvas.addEventListener('mouseup', endDraw, false);
});
  



function drawOnCanvas(pArray, ctx) {

  for(var j = 0; j < pArray.length; j++){
    ctx.strokeStyle = pArray[j].color;
    ctx.beginPath();
      ctx.moveTo(pArray[j].plots[0].x, pArray[j].plots[0].y);

    for(var i=0; i<pArray[j].plots.length; i++) {
        ctx.lineTo(pArray[j].plots[i].x, pArray[j].plots[i].y);
    }
    ctx.stroke();
  }



}
    Streamy.on('initialize_Whiteboard', function(msg){
    
    if(!msg) return; 
    //console.log('this is it\n' + msg);
    drawOnCanvas(msg.data);
    
  });
  Streamy.on('whiteboard_update', function(msg){
    if(!msg) return; 
      plotArray.push(msg);
      //setupDraw(currentColor);
      drawOnCanvas(plotArray);
      plotArray = [];
      //finishDraw();
      //setupDraw(currentColor);
  });


  function draw(e) {
    if(!isActive) return;

    if (start == 0) start = Date.now();
    var progress = Date.now() - start;
    updateArray(e);
    if (progress > 50) {
      plotArray.push({'color': currentColor, 'plots': temporaryStorage});

      drawOnCanvas(plotArray);
      Streamy.rooms(classid).emit('whiteboard_update', {'color': currentColor, 'plots': temporaryStorage});;
      //console.log("makes it here!");
      plotArray = [];
      temporaryStorage = [];
      start = 0;
      progress = 0;
    }
    
  }

  function updateArray(e){
    var x = e.offsetX || e.layerX - canvas.offsetLeft;
    var y = e.offsetY || e.layerY - canvas.offsetTop;

    //socket.emit('whiteboard update', {'color': color, 'plots': plotLine, plotArray: plotArray});   
    
    temporaryStorage.push({x: x, y: y});

  }
      
  function startDraw(e) {
    isActive = true;
  }
      
  function endDraw(e) {
    isActive = false;
    plotArray.push({'color': currentColor, 'plots': temporaryStorage});
      drawOnCanvas(plotArray);
      temporaryStorage = [];
      plotsArray = [];
  }


  $(document).ready(function () {
    Streamy.emit('get_Whiteboard');
  });
Template.vlassroom.helpers({
  startDraw: function () {
    console.log(this.data);
  }
})