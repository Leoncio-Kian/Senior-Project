Template.whiteboard.onRendered(function () {
  

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

  function drawOnCanvas(pArray) {

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
    Streamy.on('initializeWhiteboard', function(msg){
    
    if(!msg) return; 
    //console.log('this is it\n' + msg);
    drawOnCanvas(msg.data);
    
  });
  Streamy.on('whiteboard update client', function(msg){
    if(!msg) return; 
      plotArray.push(msg);
      //setupDraw(currentColor);
      drawOnCanvas(plotArray);
      plotArray = [];
      //finishDraw();
      //setupDraw(currentColor);
  });

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
      plotArray.push({'color': currentColor, 'plots': temporaryStorage});

      drawOnCanvas(plotArray);
      Streamy.emit('whiteboard update server', {'color': currentColor, 'plots': temporaryStorage});;
      //console.log("makes it here!");
      plotArray = [];
      //temporaryStorage = [];
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
    Streamy.emit('get Whiteboard');
  });
});