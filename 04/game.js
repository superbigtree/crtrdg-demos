var Game = require('crtrdg-gameloop');
var Keyboard = require('crtrdg-keyboard');
var Mouse = require('crtrdg-mouse');

var game = new Game();
var keyboard = new Keyboard(game);
var mouse = new Mouse(game);

mouse.on('click', function(){
  if ('<shift>' in keyboard.keysDown){
    box.size.x -= 25;
    box.size.y -= 25;
  } else {
    box.size.x += 25;
    box.size.y += 25;
  }
});

var box = {
  position: { x: game.width / 2, y: game.height / 2 },
  velocity: { x: 0, y: 0 },
  size: { x: 100, y: 100 },
  speed: 10
};

box.rotate = function(){
  if (degrees < 15){
    degrees += 25;
  }
};

box.input = function(keys){
  if ('A' in keys){
    box.velocity.x = - this.speed;
    box.rotate();
  }

  if ('D' in keys){
    box.velocity.x = this.speed;
    box.rotate();
  }

  if ('W' in keys){
    box.velocity.y = - this.speed;
    box.rotate();
  }

  if ('S' in keys){
    box.velocity.y = this.speed;
    box.rotate();
  }
};

box.boundaries = function(){
  if (this.position.x <= this.size.x / 2){
    this.position.x = this.size.x / 2;
  }

  if (this.position.x >= game.width - this.size.x / 2){
    this.position.x = game.width - this.size.x / 2
  }

  if (this.position.y <= this.size.y / 2){
    this.position.y = this.size.y / 2
  }

  if (this.position.y >= game.height - this.size.y / 2 ){
    this.position.y = game.height - this.size.y / 2;
  }
}

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

  box.boundaries()
});

game.on('draw', function(context){
  context.save();
  context.translate(box.position.x, box.position.y);
  context.rotate(degrees);
  context.fillStyle = '#fff';
  context.fillRect(-box.size.x/2, -box.size.y/2, box.size.x, box.size.y);
  context.restore();
});