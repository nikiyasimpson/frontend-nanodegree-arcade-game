class Entity {
	constructor() {
		this.sprite = 'images/';
		this.x = 2;
		this.y = 5;
	}

	render() {
		 ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
	}

	update(){

	}


}

class Player extends Entity {
	constructor() {
		super();
		this.sprite += 'char-boy.png';
	}

	handleInput(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	}	
}

class Enemy extends Entity {
	constructor(x,y){
		super();
		this.sprite += 'enemy-bug.png';
		this.x = x;
		this.y = y;
	}
}