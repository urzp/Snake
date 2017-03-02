const STOP = 0;
const LEFT = 1;
const RIGHT = 2;
const UP = 3;
const DOWN = 4;

const KEY_LEFT =37;
const KEY_RIGHT =39;
const KEY_UP =38;
const KEY_DOWN =40;
const KEY_SPACE = 32;

var Board = new Board();
var Snake = new Snake();
var Food = new Food();

var sound = new Audio();

var timerId;

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
        Food.draw();
        Snake.draw();
    };
};

function Food(){
    var x=Math.floor(Math.random() * Board.width);
    var y=Math.floor(Math.random() * Board.hight);
    this.position=[x,y]
    
    this.new =function(){
        x=Math.floor(Math.random() * Board.width);
        y=Math.floor(Math.random() * Board.hight);
        this.position=[x,y]
    };
    
    this.draw=function(){
      $(point_selector(this.position)).css("background","#2f8112")  
    };
}

function Snake(){
    
    this.init =function(){
        this.body=[ [40,20],[39,20] ]
        this.length = this.body.length + 1;
        this.derection = STOP;
    };
    
    this.draw = function(){  
        for( var i in this.body){
           $(point_selector(this.body[i])).css("background","#2e1fe3") 
        };
        $(point_selector(this.body[0])).css("background","#fd0404")
    };
    
    this.move=function(){  

        if (this.derection != STOP ) {
            this.eat_myself();
            this.hitting_check();
            this.eat();
            for (var i = this.body.length-1; i>0; i--){
                this.body[i] = this.body[i-1];
            }
            switch (this.derection){
                case LEFT:
                    this.body[0]=[this.body[0][0]-1, this.body[0][1]]; 
                    break
                case RIGHT:
                    this.body[0]=[this.body[0][0]+1, this.body[0][1]]; 
                    break
                case UP:
                    this.body[0]=[this.body[0][0], this.body[0][1]-1]; 
                    break
                case DOWN:
                    this.body[0]=[this.body[0][0], this.body[0][1]+1]; 
                    break    
            };
           
        };
        
    }
    
    this.hitting_check = function(){
        if (this.body[0][0] < 0 || this.body[0][0] >= Board.width ){
            alert("BUM!!!");
            this.derection = STOP;
            clearInterval(timerId);
            return true;
        }

        if (this.body[0][1] < 0 || this.body[0][1] >= Board.hight ){
            alert("BUM!!!");
            this.derection = STOP;
            clearInterval(timerId);
            return true;
        }        
        
        return false;
    };
    
    this.eat_myself=function(){
        
        for (var i = 1; i<this.body.length; i++){
            //alert(this.body[i]+"  "+this.body[0]);
            if (this.body[i][0] == this.body[0][0] && this.body[i][1] == this.body[0][1] ){
                alert("GUM!!!");
                this.derection = STOP;
                return true;
            }
        }
    }
    
    this.eat = function(){
        //alert("GUM!!!");
        if (Food.position[0] == this.body[0][0] && Food.position[1] == this.body[0][1] ){
            this.body[this.body.length]=(Food.position);
            Food.new();         
        }
    }
};

function init_game(){
    Board.draw();
}

function start_game(){
    Snake.init();
    Board.update();
    timerId = setInterval(game_update, 100);
}

function game_update(){
    Board.update();
    Snake.move(); 
};

function playSound(){
    sound.pause();
    sound.currentTime = 0;
    sound.src = "Ot_vinta.mp3";
    sound.play();
}

$( document ).keydown(function(e) {
  //alert( "Handler for .keydown() called. "+ e.which );
  switch (e.which){
      case KEY_LEFT:
          Snake.derection = LEFT
          break
      case KEY_RIGHT:
          Snake.derection = RIGHT
          break 
      case KEY_UP:
          Snake.derection = UP
          break            
      case KEY_DOWN:
          Snake.derection = DOWN
          break    
       case KEY_SPACE:
          Snake.derection = STOP
          break   
  }        
});

$(document).ready(function(){   
    init_game();
    
    $(".start").on('click', function(){ 
        start_game();
        playSound();
     } );
    
});
