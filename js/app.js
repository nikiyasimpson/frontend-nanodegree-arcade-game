class Game {
    contructor(){
        this.level = 3;
        this.stars = 0;
        this.time = 0;
    }
}

class Character {
    constructor() {
        this.sprite = 'images/';
        this.x = 2;
        this.y = 5;
        this.level = 1;
    }

    render() {
         ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
    }

    update(dt){
        this.isOutOfBoundsX = this.x > 5;
        this.isOutOfBoundsY = this.y < 1;

    }

    checkCollisions(character){
        if (this.y === character.y) {
            //how close player is before the player is in a collision 0.5
            if (this.x >= character.x - 0.5 && this.x <= character.x + 0.5) {
                return true;
            }
        }
        else {
            return false;
        }
    }


}

class Player extends Character {
    constructor() {
        super();
    
        this.playing = false;
        this.win = false;
        
    }

    update(dt) {
        super.update();
        if  (this.isOutOfBoundsY && !this.moving&& !this.win){
                showWin();
                this.win = true;

        }
    }

    render() {
        super.render();
        this.moving = false;
    }

    handleInput(input) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
        switch (input) {
            case 'left': 
                this.x = this.x > 0? this.x -1 : this.x;
                break;
            case 'up' :
                this.y = this.y > 0? this.y -1: this.y;
                break;
            case 'right':
                this.x = this.x < 4? this.x + 1: this.x;
                break;
            case 'down':
                this.y = this.y < 5? this.y + 1: this.y;
                break;
            default:
                break;
            }
        this.moving = true;


        }
}   


class Enemy extends Character {
    constructor(x,y,level =1) {
        super();
        this.sprite += 'enemy-bug.png';
        this.x = x;
        this.y = y;
        this.level = level;
        //this.speed = level *4;

        switch (level) {
    case 1:
        
            this.speed = 4;
        break;

    case 2:
            this.speed = 6;
        break;
    case 3:
            this.speed = 8;
        break;
   
    default:
            this.speed = 4;
}

    }

    update(dt) {
        super.update();
        let rand = Math.random()*dt* this.speed;
        if (this.isOutOfBoundsX){
            this.x = -1;
        }
        else {
            this.x += rand;
        }

    }
}


class Star extends Character {
    constructor() {
        super();
        this.sprite += 'Star.png';
        this.x = Math.floor(Math.random() * 5) + 1 ;
        this.y = Math.floor(Math.random() * 4) + 1 ;
        
    }

}







//Enemies



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies


let allEnemies = [];



let stars = [];
 let game = new Game();


// Place the player object in a variable called player
//const player = new Player();
  player = new Player();



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



