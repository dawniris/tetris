var tetris = {};

//Draw 10x22 grid
tetris.drawPlayField = function(){
  for(var row=0;row<22;row++){
    $('#playfield').append('<tr class="'+row+'"></tr>');
    for(var col=0;col<10;col++){
      $('.'+row).append('<td id="'+col+'"></td>');
    }
  }
}

//fill cells according to specified coordinates
tetris.fillCells = function(coordinates, fillColor){
  for(var i=0;i<coordinates.length;i++){
    var row = coordinates[i].row;
    var col = coordinates[i].col;
    var $coor = $('.'+row).find('#'+col);
    $coor.attr('bgcolor',fillColor);
    }
}

var getSomeShapes = [
  'L','J','S','O','T','Z','I'
]

//need a variable to store current coordinates
tetris.origin = {row:-2,col:Math.floor(Math.random()*9)};
tetris.currentShape = new Shape(getSomeShapes[Math.floor(Math.random()*getSomeShapes.length)]);
tetris.currentCoor = tetris.currentShape.shapeToCoor(tetris.origin);

//moves by changing currentCoor based on directional input
tetris.move = function(direction){
  var reverse
  shape = this.currentShape
  this.fillCells(this.currentCoor,'');

  for(var i=0;i<this.currentCoor.length;i++){
    if(direction === 'right'){
      this.currentCoor[i].col++;
      if(this.currentCoor[i].col>9){
        reverse = true;
      }
    } else if (direction === 'left'){
      this.currentCoor[i].col--;
      if(this.currentCoor[i].col<0){
        reverse = true;
      }
    }
  }

  //move origin
  if(direction === 'right'){
    this.origin.col++;
  } else if (direction === 'left'){
    this.origin.col--;
  }

  this.fillCells(this.currentCoor,this.currentShape.color);

  if(reverse && direction === 'left'){
    this.move('right');
  } else if (reverse && direction === 'right'){
    this.move('left');
  }
}

tetris.rotate = function(){
  var lastShape = this.currentShape

  this.fillCells(this.currentCoor, '');
  fuck = this.currentShape;
  shape = fuck.substr(0,1);
  orientation = Number(fuck.substr(1,3));

  if (shape === 'O'){
    return
  }

  if (orientation === 270){
    newOrientation = '';
  } else {
    if (shape != 'I'){
      newOrientation = orientation + 90;
    } else {
      newOrientation = orientation ? '' : 90
    }

  }

  this.currentShape = shape + newOrientation
  this.currentCoor = this.shapeToCoor(this.currentShape,this.origin);

  for(var i=0;i<this.currentCoor.length;i++){
    if(this.currentCoor[i].col>9 || this.currentCoor[i].col<0){
      this.currentShape = lastShape;
    }
    if(this.currentCoor[i].row>21){
      this.currentShape = lastShape;
    }
  }

  this.currentCoor = this.shapeToCoor(this.currentShape,this.origin);
  this.fillCells(this.currentCoor,this.currentShape.color);
}

tetris.drop = function(){
  var reverse = false;
  shape = this.currentShape

  this.fillCells(this.currentCoor,'black');
  this.origin.row++;

  for (var i=0;i<this.currentCoor.length;i++){
    this.currentCoor[i].row++;
    if(this.currentCoor[i].row>21){
      reverse = true;
    }
  }

  if(reverse){
    for (var i=0;i<this.currentCoor.length;i++){
      this.currentCoor[i].row--;
    }
    this.origin.row--;
    this.currentShape.stopMoving = true;
  }

  this.fillCells(this.currentCoor,this.currentShape.color);
}

$(document).ready(function(){
  shape = tetris.currentShape
  tetris.drawPlayField();
  tetris.fillCells(tetris.currentCoor,tetris.currentShape.color);
  setInterval(function(){tetris.drop()},500);
})

$(document).keydown(function(m){
  console.log(m.keyCode);

  shape = tetris.currentShape

  if(!shape.stopMoving){
    if(m.keyCode === 39){
      tetris.move('right')
    } else if (m.keyCode === 37){
      tetris.move('left')
    } else if (m.keyCode === 38){
      tetris.rotate();
    } else if (m.keyCode === 40){
      tetris.drop();
    }
  }
})

