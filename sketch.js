
// var stats;
var maxLines = 32;
var rowCount = 2;
var colCount = 2;
var rowLines = [];
var colLines = [];
var delta = 0;

function setup() {
  // stats = new Stats();
  // stats.showPanel(0);
  // document.body.appendChild( stats.dom );
  createCanvas(window.innerWidth, window.innerHeight);
  noStroke();
  fill(255, 16);
  drawRowsAndCols(rowCount, colCount);
  window.addEventListener('resize', onResize);
}

function draw() {
  // stats.begin();
  background(10, 100, 190);
  moveRowShapesInArray(rowLines);
  moveColShapesInArray(colLines);
  drawShapesFromArray(rowLines);
  drawShapesFromArray(colLines);
  delta += 0.008
  // stats.end();
}

function moveRowShapesInArray(array) {
  for(var i = 0; i < array.length; i++) {
    array[i].a.y += cos(delta * (i + 1)) * 1.5;
    array[i].b.y += sin(delta * (i + 1)) * 1.5;
  }
}

function moveColShapesInArray(array) {
  for(var i = 0; i < array.length; i++) {
    array[i].a.x += cos(delta * (i + 1)) * 1.5;
    array[i].b.x += sin(delta * (i + 1)) * 1.5;
  }
}

function drawShapesFromArray(array) {
  for(var i = 0; i < array.length; i += 2) {
    beginShape();
    vertex(array[i].a.x, array[i].a.y);
    vertex(array[i].b.x, array[i].b.y);
    vertex(array[i + 1].b.x, array[i + 1].b.y);
    vertex(array[i + 1].a.x, array[i + 1].a.y);
    endShape();
  }
}

function drawRowsAndCols(rows, cols)  {
  rowCount = rows;
  colCount = cols;
  rows *= 2;
  cols *= 2;
  rowLines = [];
  colLines = [];
  var rowSpace = window.innerHeight / rows;
  var colSpace = window.innerWidth / cols;
  for(var i = 0; i < rows; i++) {
    var y = rowSpace * (1/2 + i);
    var startPoint = {
        x: 0,
        y: y
      };
    var endPoint = {
      x: width,
      y: y
    };
    var theLine = {
      a: startPoint,
      b: endPoint
    }
    rowLines[i] = theLine;
  }
  for(var i = 0; i < cols; i++) {
    var x = colSpace * (1/2 + i);
    var startPoint = {
        x: x,
        y: 0
      };
    var endPoint = {
      x: x,
      y: height
    };
    var theLine = {
      a: startPoint,
      b: endPoint
    }
    colLines[i] = theLine;
  }
}
function mouseClicked() {
  delta = 0;
  var rowLineCount = parseInt(map(mouseY, 0, height, 0, maxLines), 10);
  var colLineCount = parseInt(map(mouseX, 0, width, 0, maxLines), 10);
  drawRowsAndCols(rowLineCount, colLineCount);
  var elem = canvas;
  if (elem.requestFullscreen) {
    elem.elem();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}


function mouseDragged() {
  delta = 0;
  var rowLineCount = parseInt(map(mouseY, 0, height, 0, maxLines), 10);
  var colLineCount = parseInt(map(mouseX, 0, width, 0, maxLines), 10);
  drawRowsAndCols(rowLineCount, colLineCount);
}

function onResize() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  drawRowsAndCols(rowCount, colCount);
};