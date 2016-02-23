Template.home.events({
  "click .thiswhiteboard": function (event, template) {
  	alert("whiteboard was clicked!");
  }
});
/*
var canvas = document.getElementById('drawCanvas');
var ctx = canvas.getContext('2d');
     
ctx.lineWidth = '3';
ctx.lineCap = 'round';
ctx.lineJoin = 'round';3

var currentColor = 'blue';

var temporaryStorage = [];

canvas.addEventListener('mousedown', startDraw, false);
canvas.addEventListener('mousemove', draw, false);
canvas.addEventListener('mouseup', endDraw, false);

function setupDraw(color){
	ctx.strokeStyle = color;
	ctx.beginPath();		
}

function drawOnCanvas(plots) {
  ctx.moveTo(plots[0].x, plots[0].y);

  for(var i=1; i<plots.length; i++) {
    ctx.lineTo(plots[i].x, plots[i].y);
  }

  ctx.stroke();
}
function finishDraw(){
	var holdLastPos = temporaryStorage[temporaryStorage.length - 1];
	temporaryStorage = [];
  temporaryStorage.push(holdLastPos);
}

var isActive = false;
var plotArray = [];
var start = 0;
var progress = 0;

function draw(e) {
  if(!isActive) return;

  if (start == 0) start = Date.now();
  var progress = Date.now() - start;
  updateArray(e);
  if (progress > 50) {
  	
    drawOnCanvas(temporaryStorage);
    finishDraw();
    setupDraw(currentColor);
    start = 0;
    progress = 0;
    
    ctx.beginPath();
  }
	
}

function updateArray(e){
	var x = e.offsetX || e.layerX - canvas.offsetLeft;
    var y = e.offsetY || e.layerY - canvas.offsetTop;
	
	temporaryStorage.push({x: x, y: y});

}
    
function startDraw(e) {
  isActive = true;
	setupDraw(currentColor);
	temporaryStorage = [];
}
    
function endDraw(e) {
	isActive = false;
	setupDraw(currentColor);
    drawOnCanvas(temporaryStorage);
    finishDraw();
	temporaryStorage = [];
}
*/