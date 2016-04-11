/**
 * Created by leonc on 4/9/2016.
 */




export function Whiteboard(canvas) {
  var _canvas = canvas;
  var _ctx = _canvas.getContext('2d');
  var that = this;
  var isActive = false;
  var plots = [];
  var currentColor = 'blue';
  var currentLineWidth = '3';
  var start = 0;
  var progress =0;
  var clients = [];

  function initialize() {
    _canvas.addEventListener('mousedown', startDraw, false);
    _canvas.addEventListener('mousemove', draw, false);
    _canvas.addEventListener('mouseup', endDraw, false);
  }
  function checkTime(){
    if(start === 0){
      start = Date.now();
      return false;
    }
    progress = Date.now() - start;
    if(progress > 50){
      start = Date.now();
      return true;
    }
    else{
      return false;
    }
  }
  function initializeCtx(color, width) {
    _ctx.strokeStyle = color || currentColor;
    _ctx.lineWidth = width || currentLineWidth;
    _ctx.lineCap = 'round';
    _ctx.lineJoin = 'round';
    _ctx.beginPath();
  }
  function drawSegmentsOnCanvas(arrayPlots){
    for (var k = 0; k < arrayPlots.length; k++){
      console.log("looping!");
      initializeCtx();
      _ctx.moveTo(arrayPlots[k].plots[0].x, arrayPlots[k].plots[0].y);
      drawOnCanvas(arrayPlots[k].plots);
    }
  }
  function drawOnCanvas(plots) {
    for(var i = 0; i<plots.length; i++) {
      _ctx.lineTo(plots[i].x, plots[i].y);
    }
    _ctx.stroke();
  }
  function updateArray(e) {
  var x = e.offsetX || e.layerX - cWhiteboard.getCanvas().offsetLeft;
  var y = e.offsetY || e.layerY - cWhiteboard.getCanvas().offsetTop;


  plots.push({ x: x, y: y });



}
  function draw(e) {
    var x, y, plotLength;
    if (!isActive) {
      return;
    }
    updateArray(e);
    if (checkTime()) {

      initializeCtx();
      _ctx.moveTo(clients["thisClient"].x, clients["thisClient"].y);

      drawOnCanvas(plots);
      //console.log('inside the draw method!', Streamy.rooms('whiteboard ' + Session.get("classid")).emit('whiteboard update', {'something':"work"}));
      Window.emitUpdate(currentColor, currentLineWidth,plots);
      Meteor.call('set_whiteboard', Session.get("classid"), { 'plots': plots });
      plotLength = plots.length;
      clients["thisClient"] = {x:plots[plotLength  - 1].x, y:plots[plotLength - 1].y};

      plots = [];
      plots.push({x: clients["thisClient"].x, y: clients["thisClient"].y});
    }
  }

  function startDraw(e) {
    console.log('started drawing, e is: ', e);

    var startx = e.offsetX || e.layerX - canvas.offsetLeft;
    var starty = e.offsetY || e.layerY - canvas.offsetTop;
    console.log(this);
    clients["thisClient"] = {x: startx, y: starty};
    _ctx.moveTo(startx, starty);
    isActive = true;
  }

  function endDraw(e) {
    console.log('finished drawing!');
    isActive = false;
    Window.emitUpdate(currentColor, plots);
    plots = [];
    clients["thisClient"] = {};

  }
  that.updateWhiteboard = function (plotArray) {
    var templength = plotArray.plots.length;
    initializeCtx(plotArray.color, plotArray.linewidth);
    if(! (plotArray.__from in clients)){
      console.log('made it inside condiditional statement in wb.js');
      clients[plotArray.__from] = {x: plotArray.plots[0].x, y: plotArray.plots[0].y};
    }
    console.log(plotArray);
    _ctx.moveTo(clients[plotArray.__from].x, clients[plotArray.__from].y);
    console.log('inside updateWhiteboard priviledged method!', plotArray);
    drawOnCanvas(plotArray.plots);

    clients[plotArray.__from] = {};
  }
  that.initializeWhiteboard = function (plotArray) {
    console.log("inside initialize whiteboard function object");
    drawSegmentsOnCanvas(plotArray);
  }
  that.setColor = function (color) {
    currentColor = color;
  }
  that.setLineWidth = function (width) {
    currentLineWidth = width;
  }
  that.clearWhiteboard = function (clear) {
    if(clear === true) {
      _ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  initialize();
}