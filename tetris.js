//Declare global object 'tetris'
var tetris = {};

//Draw gameplay grid
tetris.drawPlayField = function(){
  for(var row=0;row<22;row++){
    $('#playfield').append('');
    for(var col=0;col<10;col++){
      $('.'+row).append('');
    }
  }
}

$(document).ready(function(){
  tetris.drawPlayField();
})