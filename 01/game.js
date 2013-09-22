var Game = require('crtrdg-gameloop');
var Mouse = require('crtrdg-mouse');

var game = new Game();

var box = {
  position: { x: game.width/2, y: game.height/2 },
  size: { x: 100, y: 100 }
};

box.rotate = function(){
  degrees += 25;
}

var mouse = new Mouse(game);
mouse.on('click', function(){
  box.rotate();
});

var degrees = 0;
game.on('update', function(){
  if (degrees > 0){
    degrees--;
  }
});

game.on('draw', function(context){
  context.save();
  context.translate(box.position.x, box.position.y);
  context.rotate(degrees);
  context.fillStyle = '#fff';
  context.fillRect(-box.size.x/2, -box.size.y/2, box.size.x, box.size.y);
  context.restore();
});