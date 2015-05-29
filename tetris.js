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

//need a variable to store current coordinates
tetris.currentCoor = [{row:1,col:1},
                      {row:1,col:2},
                      {row:2,col:1},
                      {row:2,col:2}];

//fill cells according to specified coordinates
tetris.fillCells = function(coordinates, fillColor){
  for(var i=0;i<coordinates.length;i++){
    var row = coordinates[i].row;
    var col = coordinates[i].col;
    var $coor = $('.'+row).find('#'+col);
    $coor.attr('bgcolor',fillColor);
    }
}

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

