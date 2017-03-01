const begin = 0;
const left = 1;
const right = 2;
const up = 3;
const down = 4;

function point_selector(position){
    
    var point = position[0] + "," + position[1];
    var selector = '.cell[position="'+point+'"]';
    return selector;
};

function Board(){
    this.width = 80,
    this.hight = 40
    
    this.draw = function(){
        var pos_str ='';
        for(var y = 0; y < this.hight ;y++){
             for(var x = 0; x < this.width ;x++){
                 var str = x+","+y;
                 str = '<div class="cell" position="' + str + '" >' 
                 $('.game_space').append(str); 
            };
        };
        
    };
    
    this.clear = function(){
      $('.cell').css("background","#aaa")  
    };
    
    this.update =function(){
        this.clear();
        Snake.draw();
    };
};


function Snake(){
    this.position_head = [40,20];
    this.body=[ [39,20],[38,20] ]
    this.length = this.body.length + 1;
    this.derection = begin;
    
    this.draw = function(){  
        $(point_selector(this.position_head)).css("background","#fd0404")
        for( var i in this.body){
           $(point_selector(this.body[i])).css("background","#2e1fe3") 
        };
    };
};


var Board = new Board();
var Snake = new Snake();


$(document).ready(function(){
    Board.draw();
    Board.update();
    
});