var Game = require('crtrdg-gameloop');
var Keyboard = require('crtrdg-keyboard');

var game = new Game();
var keyboard = new Keyboard(game);

var box = {
  position: { x: game.width / 2, y: game.height / 2 },
  velocity: { x: 0, y: 0 },
  size: { x: 100, y: 100 }
};

box.rotate = function(){
  if (degrees < 15){
    degrees += 25;
  }
};

box.input = function(keys){
  if ('A' in keys){
    box.velocity.x = -5;
    box.rotate();
  }

  if ('D' in keys){
    box.velocity.x = 5;
    box.rotate();
  }

  if ('W' in keys){
    box.velocity.y = -5;
    box.rotate();
  }

  if ('S' in keys){
    box.velocity.y = 5;
    box.rotate();
  }
};

var degrees = 0;
game.on('update', function(){
  if (degrees > 0){
    degrees--;
  }
  
  box.input(keyboard.keysDown);
  
  box.position.x += box.velocity.x;
  box.position.y += box.velocity.y;
  
  box.velocity.x *= .9;
  box.velocity.y *= .9;
});

game.on('draw', function(context){
  context.save();
  context.translate(box.position.x, box.position.y);
  context.rotate(degrees);
  context.fillStyle = '#fff';
  context.fillRect(-50, -50, box.size.x, box.size.y);
  context.restore();
});