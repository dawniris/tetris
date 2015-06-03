var fuckingSetColor = function(id){
  var colorHash = {
    'L': 'purple', 'J': 'blue', 'S': 'yellow',
    'O': 'green', 'T': 'red', 'Z': 'pink', 'I': 'black'
  }
  return colorHash[id]
}

function Shape (id) {
  this.id = id
  this.color = fuckingSetColor(id)
}

Shape.prototype = {
//Z, J, and S still need to get their coordinates figured out

  shapeToCoor: function(origin){
    if(this.id === 'L'){
      return[{row:origin.row,col:origin.col},
             {row:origin.row-1,col:origin.col},
             {row:origin.row+1,col:origin.col},
             {row:origin.row+1,col:origin.col+1}]
    }
    else if (this.id === 'L90'){
      return [{row:origin.row,col:origin.col},
              {row:origin.row,col:origin.col+1},
              {row:origin.row,col:origin.col-1},
              {row:origin.row+1,col:origin.col-1}]
    }
    else if(this.id === 'L180'){
      return[{row:origin.row,col:origin.col},
             {row:origin.row+1,col:origin.col},
             {row:origin.row-1,col:origin.col},
             {row:origin.row-1,col:origin.col-1}]
    }
    else if(this.id === 'L270'){
      return[{row:origin.row,col:origin.col},
             {row:origin.row,col:origin.col-1},
             {row:origin.row-1,col:origin.col+1},
             {row:origin.row,col:origin.col+1}]
    }
    else if(this.id === 'J'){
      return[{row:origin.row,col:origin.col},
             {row:origin.row-1,col:origin.col},
             {row:origin.row+1,col:origin.col},
             {row:origin.row+1,col:origin.col-1}]
    }
    //DIDN'T USE THE MIDDLE TILE FOR THE ORIGIN YOU ASS
   else if(this.id === 'J90'){
      return[{row:origin.row,col:origin.col},
             {row:origin.row-1,col:origin.col},
             {row:origin.row,col:origin.col+1},
             {row:origin.row,col:origin.col+2}]
    }
    else if(this.id === 'J180'){
      return[{row:origin.row,col:origin.col},
             {row:origin.row,col:origin.col+1},
             {row:origin.row+1,col:origin.col},
             {row:origin.row+2,col:origin.col}]
    }
    // may need rot. tweaking
    else if(this.id === 'J270'){
      return[{row:origin.row,col:origin.col},
             {row:origin.row-1,col:origin.col},
             {row:origin.row,col:origin.col-1},
             {row:origin.row,col:origin.col-2}]
    }
    else if(this.id === 'I'){
      return[{row:origin.row,col:origin.col},
             {row:origin.row-1,col:origin.col},
             {row:origin.row+1,col:origin.col},
             {row:origin.row+2,col:origin.col}]
    }
    else if(this.id === 'I90'){
      return[{row:origin.row,col:origin.col},
             {row:origin.row,col:origin.col-1},
             {row:origin.row,col:origin.col+1},
             {row:origin.row,col:origin.col+2}]
    }
    else if(this.id === 'O'){
      return[{row:origin.row,col:origin.col},
             {row:origin.row-1,col:origin.col},
             {row:origin.row,col:origin.col+1},
             {row:origin.row-1,col:origin.col+1}]
    }
    else if(this.id === 'T'){
      return[{row:origin.row,col:origin.col},
             {row:origin.row-1,col:origin.col},
             {row:origin.row,col:origin.col+1},
             {row:origin.row,col:origin.col-1}]
    }
    else if(this.id === 'T90'){
      return[{row:origin.row,col:origin.col},
             {row:origin.row-1,col:origin.col},
             {row:origin.row+1,col:origin.col},
             {row:origin.row,col:origin.col+1}]
    }
    else if(this.id === 'T180'){
      return[{row:origin.row,col:origin.col},
             {row:origin.row-1,col:origin.col},
             {row:origin.row,col:origin.col+1},
             {row:origin.row,col:origin.col-1}]
    }
    else if(this.id === 'T270'){
      return[{row:origin.row,col:origin.col},
             {row:origin.row-1,col:origin.col},
             {row:origin.row+1,col:origin.col},
             {row:origin.row,col:origin.col-1}]
    }
    else if(this.id === 'S'){
      return[{row:origin.row,col:origin.col},
             {row:origin.row-1,col:origin.col},
             {row:origin.row,col:origin.col-1},
             {row:origin.row-1,col:origin.col+1}]
    }
    else if(this.id === 'S90'){
      return[{row:origin.row,col:origin.col},
             {row:origin.row-1,col:origin.col},
             {row:origin.row,col:origin.col+1},
             {row:origin.row+1,col:origin.col-1}]
    }
    else if(this.id === 'Z'){
      return[{row:origin.row,col:origin.col},
             {row:origin.row,col:origin.col-1},
             {row:origin.row+1,col:origin.col},
             {row:origin.row+1,col:origin.col+1}]
    }
    else if(this.id === 'Z90'){
      return[{row:origin.row,col:origin.col},
             {row:origin.row,col:origin.col+1},
             {row:origin.row-1,col:origin.col},
             {row:origin.row+1,col:origin.col+1}]
    }
  }
}