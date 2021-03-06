/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make 
 * writing app.js a little simpler to work with.
 */

var Engine = (function(global) {
    "use strict";
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */

    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);


    /* Start Here Area */
    const startSection = document.createElement('div');
    document.body.appendChild(startSection);
    startSection.classList.add("modal");


    /*Show Start Modal */
    startSection.style.display = "block";

    const startSectionContent = document.createElement('div');
    startSection.appendChild(startSectionContent);
    startSectionContent.classList.add("modal-content");
    const instructionsParagraph = document.createElement('p');
    const insText = document.createTextNode("You have 30 seconds to cross the road, collect stars and avoid the bugs. Use up, down, left and right arrow keys to move.");
    instructionsParagraph.appendChild(insText);
    startSectionContent.appendChild(instructionsParagraph);
    const levelInsP= document.createElement('h2');
    startSectionContent.appendChild(levelInsP);

    /* Choose Player Level */
    var levelInst = document.createTextNode("Choose Your Level");  
    levelInsP.appendChild(levelInst);

    const levelChoice = document.createElement('ul'),
            level1 = document.createElement('li'),
            level2  = document.createElement('li'),
            level3 = document.createElement('li');


    level1.textContent = '1';
    level2.textContent = '2';
    level3.textContent = '3';

    levelChoice.classList.add("level");

    startSectionContent.appendChild(levelChoice);
    levelChoice.appendChild(level1);
    levelChoice.appendChild(level2);
    levelChoice.appendChild(level3);


    level1.onclick = function(){
        
        level1.classList.add("selected");
        level2.classList.remove("selected");
        level3.classList.remove("selected");
        gameLevel = 1;
       
    };


    level2.onclick = function(){
    
        level2.classList.add("selected");
        level1.classList.remove("selected");
        level3.classList.remove("selected");
        gameLevel = 2;

    };


    level3.onclick = function(){
        
        level3.classList.add("selected");
        level1.classList.remove("selected");
        level2.classList.remove("selected");
        gameLevel= 3;
       
    };

    /*Choose Player Avatar */
    const playerInsP= document.createElement('h2');
    startSectionContent.appendChild(playerInsP);
    var playerInst = document.createTextNode("Choose Your Player");  
    playerInsP.appendChild(playerInst);

    var player1 = document.createElement("img");
    var player2 = document.createElement("img");
    var player3 = document.createElement("img");

    const player1src = 'char-boy.png';
    const player2src = 'char-pink-girl.png';
    const player3src = 'char-princess-girl.png';

    player1.src = 'images/'+ player1src;
    player2.src = 'images/'+ player2src;
    player3.src = 'images/'+ player3src;

    const playerChoices = document.createElement('ul'),
            playerchoice1 = document.createElement('li'),
            playerchoice2  = document.createElement('li'),
            playerchoice3 = document.createElement('li');


    playerchoice1.appendChild(player1);
    playerchoice2.appendChild(player2);
    playerchoice3.appendChild(player3);

    playerchoice1.classList.add("playerSelection");
    playerchoice2.classList.add("playerSelection");
    playerchoice3.classList.add("playerSelection");

    playerChoices.classList.add("player");

    startSectionContent.appendChild(playerChoices);
    playerChoices.appendChild(playerchoice1);
    playerChoices.appendChild(playerchoice2);
    playerChoices.appendChild(playerchoice3);

    playerchoice1.onclick = function(){
        
        playerchoice1.classList.add("selected");
        playerchoice2.classList.remove("selected");
        playerchoice3.classList.remove("selected");
        player.sprite = 'images/char-boy.png';
    };

    playerchoice2.onclick = function(){
    
        playerchoice2.classList.add("selected");
        playerchoice1.classList.remove("selected");
        playerchoice3.classList.remove("selected");
        player.sprite = 'images/char-pink-girl.png';
    };


    playerchoice3.onclick = function(){
      
        playerchoice3.classList.add("selected");
        playerchoice1.classList.remove("selected");
        playerchoice2.classList.remove("selected");
        player.sprite = 'images/char-princess-girl.png';
    };


    /*Start Game Button*/
    const startButton = document.createElement('button');
    startSectionContent.appendChild(startButton);
    var t = document.createTextNode("Start Game");  
    startButton.classList.add("playButton");
    startButton.appendChild(t);
    startButton.onclick = function() {
        startSection.style.display = "none";
        restartGame();
        init();
    };

    /*Restart Game Settings*/
    function restartGame(){
          game.stars = 0;
            game.level = gameLevel;
            /*Set Default Player if No Player is Chose */
            if (player.sprite === "images/") {
                player.sprite = "images/char-boy.png";
            }

            const enemy1 = new Enemy(0,1,gameLevel);
            const enemy2 = new Enemy(-2,2,gameLevel);
            const enemy3 = new Enemy(-4,3,gameLevel);
            const enemy4 = new Enemy(0,4,gameLevel);
            const enemy5 = new Enemy(-7,2,gameLevel);

            
            switch (game.level) {
            case 1:
                allEnemies = [enemy1,enemy2,enemy3];
                stars = [...Array(4)].map((_,i) => new Star());
                break;

            case 2:
                allEnemies = [enemy1,enemy2,enemy3,enemy4];
                stars = [...Array(5)].map((_,i) => new Star());
                break;
            case 3:
                allEnemies = [enemy1,enemy2,enemy3,enemy4,enemy5];
                stars = [...Array(6)].map((_,i) => new Star());
                break;
       
            default:
                allEnemies = [enemy1,enemy2,enemy3];
            }
    }

     /* Update timer display */
    function updateDisplay() {
        
        let value = parseInt($('#timer').find('.value').text(), 10);
        value--;
        $('#timer').find('.value').text(value);
    }

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        game.gameOver = false;
        lastTime = Date.now();
        gameTimer = setInterval(updateDisplay, 1000); // every second call updateDisplay

        setTimeout(function() {    
            // Set a timer
                if(game.gameOver === false) {
                    clearInterval(gameTimer);      // Stop the running loop
                    /* Create Game Over Modal */
                    const gameOver = document.createElement('div');
                    document.body.appendChild(gameOver);
                    gameOver.classList.add("modal");
                    gameOver.style.display = "block";
                    const gameOverContent = document.createElement('div');
                    gameOver.appendChild(gameOverContent);
                    gameOverContent.classList.add("modal-content");
                    const gameOverHeader= document.createElement('h2');
                    const gameOverText = document.createTextNode("Game Over!");
                    gameOverHeader.appendChild(gameOverText);
                    gameOverContent.appendChild(gameOverHeader);
                    
                    const restartButton = document.createElement('button');
                    gameOverContent.appendChild(restartButton);
                    var t = document.createTextNode("Play Again?");  
                    restartButton.classList.add("playButton");
                    restartButton.appendChild(t);
                    restartButton.onclick = function() {
                        gameOver.style.display = "none";
                        $('#timer').find('.value').text(0);
                        restartGame();
                        init();
                    };
                }
                        // Let the user know, do other stuff here
        }, 30000); 


        main();  
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        checkCollisions();
    }

    function checkCollisions(){
        allEnemies.forEach(enemy => {
            if(enemy.checkCollisions(player) || player.checkCollisions(enemy)) {
                player.y = 5;
                player.x = 0;
            }
        });
             
        stars.forEach(star => {
            if(star.checkCollisions(player))
                {
                    game.stars += 1;
                    const index = stars.indexOf(star);
                    stars.splice(index,1);
                }
        });
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });

        if (player.win){
            showWin();
            game.gameOver = true;
            reset();  
        }
        else
        {
            player.update();
        }
        
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;
        
        // Before drawing, clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height);

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });


        stars.forEach(function(star) {
            star.render();
        });

        player.render();
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        /*resets player settings*/
    
        player.y = 5;
        player.x = 0;
        player.win = false;
        
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-pink-girl.png',
        'images/char-princess-girl.png',
        'images/Star.png'
    ]);
    
    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;


})(this);
