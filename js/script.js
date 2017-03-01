
function Board(){
    this.width = 80,
    this.hight = 40
    
    this.draw = function(){
        for(var y = 0; y < this.hight ;y++){
             for(var x = 0; x < this.width ;x++){
                 $('.game_space').append('<div class="board_cell">'); 
            };
        };
        
    };
};

var Board = new Board();



$(document).ready(function(){
    Board.draw();
    
});