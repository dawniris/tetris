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

//need a variable to store current coordinates
tetris.origin = {row:5,col:5};
tetris.currentShape = 'L'
tetris.currentCoor;

tetris.shapeToCoor = function(shape,origin){
  if(shape === 'L'){
    return[{row:origin.row,col:origin.col},
           {row:origin.row-1,col:origin.col},
           {row:origin.row+1,col:origin.col},
           {row:origin.row+1,col:origin.col+1}]
  }
  else if (shape === 'L90'){
    return [{row:origin.row,col:origin.col},
            {row:origin.row,col:origin.col+1},
            {row:origin.row,col:origin.col-1},
            {row:origin.row+1,col:origin.col-1}]
  }
  else if(shape === 'L180'){
    return[{row:origin.row,col:origin.col},
           {row:origin.row+1,col:origin.col},
           {row:origin.row-1,col:origin.col},
           {row:origin.row-1,col:origin.col-1}]
  }
  else if(shape === 'L270'){
    return[{row:origin.row,col:origin.col},
           {row:origin.row,col:origin.col-1},
           {row:origin.row-1,col:origin.col+1},
           {row:origin.row,col:origin.col+1}]
  }
  else if(shape === 'J'){
    return[{row:origin.row,col:origin.col},
           {row:origin.row-1,col:origin.col},
           {row:origin.row+1,col:origin.col},
           {row:origin.row+1,col:origin.col-1}]
  }
  //DIDN'T USE THE MIDDLE TILE FOR THE ORIGIN YOU ASS
 else if(shape === 'J90'){
    return[{row:origin.row,col:origin.col},
           {row:origin.row-1,col:origin.col},
           {row:origin.row,col:origin.col+1},
           {row:origin.row,col:origin.col+2}]
  }
  else if(shape === 'J180'){
    return[{row:origin.row,col:origin.col},
           {row:origin.row,col:origin.col+1},
           {row:origin.row+1,col:origin.col},
           {row:origin.row+2,col:origin.col}]
  }
  // may need rot. tweaking
  else if(shape === 'J270'){
    return[{row:origin.row,col:origin.col},
           {row:origin.row-1,col:origin.col},
           {row:origin.row,col:origin.col-1},
           {row:origin.row,col:origin.col-2}]
  }
  else if(shape === 'I'){
    return[{row:origin.row,col:origin.col},
           {row:origin.row-1,col:origin.col},
           {row:origin.row+1,col:origin.col},
           {row:origin.row+2,col:origin.col}]
  }
  else if(shape === 'I90'){
    return[{row:origin.row,col:origin.col},
           {row:origin.row,col:origin.col-1},
           {row:origin.row,col:origin.col+1},
           {row:origin.row,col:origin.col+2}]
  }
  else if(shape === 'O'){
    return[{row:origin.row,col:origin.col},
           {row:origin.row-1,col:origin.col},
           {row:origin.row,col:origin.col+1},
           {row:origin.row-1,col:origin.col+1}]
  }
  else if(shape === 'T'){
    return[{row:origin.row,col:origin.col},
           {row:origin.row-1,col:origin.col},
           {row:origin.row,col:origin.col+1},
           {row:origin.row,col:origin.col-1}]
  }
  else if(shape === 'T90'){
    return[{row:origin.row,col:origin.col},
           {row:origin.row-1,col:origin.col},
           {row:origin.row+1,col:origin.col},
           {row:origin.row,col:origin.col+1}]
  }
  else if(shape === 'T180'){
    return[{row:origin.row,col:origin.col},
           {row:origin.row-1,col:origin.col},
           {row:origin.row,col:origin.col+1},
           {row:origin.row,col:origin.col-1}]
  }
  else if(shape === 'T270'){
    return[{row:origin.row,col:origin.col},
           {row:origin.row-1,col:origin.col},
           {row:origin.row+1,col:origin.col},
           {row:origin.row,col:origin.col-1}]
  }
  else if(shape === 'S'){
    return[{row:origin.row,col:origin.col},
           {row:origin.row-1,col:origin.col},
           {row:origin.row,col:origin.col-1},
           {row:origin.row-1,col:origin.col+1}]
  }
  else if(shape === 'S90'){
    return[{row:origin.row,col:origin.col},
           {row:origin.row-1,col:origin.col},
           {row:origin.row,col:origin.col+1},
           {row:origin.row+1,col:origin.col-1}]
  }
  else if(shape === 'Z'){
    return[{row:origin.row,col:origin.col},
           {row:origin.row,col:origin.col-1},
           {row:origin.row+1,col:origin.col},
           {row:origin.row+1,col:origin.col+1}]
  }
  else if(shape === 'Z90'){
    return[{row:origin.row,col:origin.col},
           {row:origin.row,col:origin.col+1},
           {row:origin.row-1,col:origin.col},
           {row:origin.row+1,col:origin.col+1}]
  }
}

tetris.currentCoor = tetris.shapeToCoor(tetris.currentShape,tetris.origin);

//moves by changing currentCoor based on directional input
tetris.move = function(direction){
  var reverse = false
  this.fillCells(this.currentCoor,'');

  for(var i=0;i<this.currentCoor.length;i++){
    if(direction === 'right'){
      this.currentCoor[i].col++;
      if(this.currentCoor[i].col>9){
        reverse = true
      }
    } else if (direction === 'left'){
      this.currentCoor[i].col--;
      if(this.currentCoor[i].col<0){
        reverse = true
      }
    }
  }

  //move origin
  if(direction === 'right'){
    this.origin.col++;
  } else if (direction === 'left'){
    this.origin.col--;
  }

  this.fillCells(this.currentCoor,'purple');

  if(reverse && direction === 'left'){
    this.move('right');
  } else if (reverse && direction === 'right'){
    this.move('left');
  }
}

tetris.rotate = function(){
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
  console.log(this.currentShape)

  this.currentCoor = this.shapeToCoor(this.currentShape,this.origin);
  this.fillCells(this.currentCoor, 'purple');
}


$(document).ready(function(){
  tetris.drawPlayField();
  tetris.fillCells(tetris.currentCoor, 'purple')
})


$(document).keydown(function(m){
  console.log(m.keyCode);
  if(m.keyCode === 39){
    tetris.move('right')
  } else if (m.keyCode === 37){
    tetris.move('left')
    //figure out rotation yo
  } else if (m.keyCode === 38){
    tetris.rotate();
  }
})

