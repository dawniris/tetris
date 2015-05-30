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
tetris.currentShape = 'S'
tetris.currentCoor; //= [{row:1,col:1},
                    //  {row:1,col:2},
                    //  {row:2,col:1},
                    //  {row:2,col:2}];

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
            {row:origin.row,col:origin.col-1}]
  }
  //continue writing the fucking transformations, goddamnit
  else if(shape === 'J'){
    return[{row:origin.row,col:origin.col},
           {row:origin.row-1,col:origin.col},
           {row:origin.row+1,col:origin.col},
           {row:origin.row+1,col:origin.col-1}]
  }
  else if(shape === 'I'){
    return[{row:origin.row,col:origin.col},
           {row:origin.row-1,col:origin.col},
           {row:origin.row+1,col:origin.col},
           {row:origin.row+2,col:origin.col}]
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
  else if(shape === 'S'){
    return[{row:origin.row,col:origin.col},
           {row:origin.row-1,col:origin.col},
           {row:origin.row,col:origin.col-1},
           {row:origin.row-1,col:origin.col+1}]
  }
  else if(shape === 'Z'){
    return[{row:origin.row,col:origin.col},
           {row:origin.row,col:origin.col-1},
           {row:origin.row+1,col:origin.col},
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

  this.fillCells(this.currentCoor,'yellow');

  if(reverse && direction === 'left'){
    this.move('right');
  } else if (reverse && direction === 'right'){
    this.move('left');
  }
}

tetris.rotate = function(){
  this.fillCells(this.currentCoor, '');
  if(this.currentShape === 'L'){
    this.currentShape = 'L90';
  } else if(this.currentShape === 'L90'){
    this.currentShape === 'L'
  }
this.currentCoor = this.shapeToCoor(this.currentShape,this.origin);
this.fillCells(this.currentCoor, 'yellow');
}

$(document).ready(function(){
  tetris.drawPlayField();
  tetris.fillCells(tetris.currentCoor, 'yellow')
})

$(document).keydown(function(m){
  console.log(m.keyCode);
  if(m.keyCode === 39){
    tetris.move('right')
  } else if (m.keyCode === 37){
    tetris.move('left')
  }
})

