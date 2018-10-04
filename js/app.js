// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // x position
    this.x = x;
    // centered y position
    this.y = y + 55;
    //speed of Enemy
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.step = -101;
    this.boundary = -this.step * 5;
    this.resetPos = this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // If enemy is not passed boundary
    if(this.x < this.boundary) {
      // Move forward
      // Increment x by speed * dt
      this.x += this.speed * dt;
    }
    else {
      // Reset position to start
      this.x = this.resetPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//Hero class
class Hero {
  // Constructor
  constructor() {
    // Properties
      // sprite image
      this.sprite = 'images/char-boy.png';
      this.step = 101;
      this.jump = 83;
      this.startX = this.step * 2;
      this.startY = (this.jump * 4) + 55;
      // x pos
      this.x = this.startX;
      // y pos
      this.y = this.startY;
      //Initial value of false when the object is created
      this.victory = false;

  }

  // Update position
  update() {
    // Check collision here
    for(let enemy of allEnemies) {
      // Did player x and y collide with enemy
      if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2) ) {
          this.reset();
      }
    }
    // Check win here
        // Property is equal to true when hero object reaches river
        if(this.y === -28) {
          this.victory = true;
        }
  }










  // Render
      // Draw player sprite on current x and y coord position
      render() {
        ctx.drawImage (Resources.get(this.sprite), this.x, this.y);
      }

      // Handle keyboard input
          // Update player's x and y property according to input

        //  @param {string} input - Direction to travel

          handleInput(input) {
              switch(input) {
                case 'left':
                  if (this.x > 0) {
                      this.x -= this.step;
                  }
                  break;
                case 'up':
                  if (this.y > 0) {
                      this.y -= this.jump;
                  }
                  break;
                case 'right':
                  if (this.x < this.step *4) {
                      this.x += this.step;
                  }
                  break;
                case 'down':
                  if (this.y < this.jump * 4) {
                      this.y += this.jump;
                  }
                  break;
              }
          }


          // Reset Hero
          reset() {
            // Set x and y to starting x and y
            this.y = this.startY;
            this.x = this.startX;
          }




}








// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// New Hero object
const player = new Hero();
// instantiate multiple Enemy objects with unique properties
const bug1 = new Enemy(-101, 0, 300);
const bug2 = new Enemy(-101, 83, 400);
const bug3 = new Enemy(-101, 83, 500);
const bug4 = new Enemy(303, 249, 800);
// Init allEnemies Array
//For each enemy create and push new Enemy object into above array
const allEnemies = [];
allEnemies.push(bug1, bug2, bug3, bug4);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
