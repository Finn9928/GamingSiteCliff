/*******************************************************/
// P5.play: DinoClone
// Written by Cliff Harfield
/*******************************************************/
code: {
    console.log("Debug");
    const SCREEN_WIDTH = 800;
    const SCREEN_HEIGHT = 400;
    const PLAYER_SCALE = SCREEN_HEIGHT / 8;
    const BLOCK_SCALE = SCREEN_HEIGHT / 8;
    let blockSpeed = -10;
    let blocks;
    var spawnDist = 0 + 1;
    let nextSpawn = 0;
    let score = 0;
    let blueCube;
    let highScore = 0;
    let state = "start";
    let playerAlive = "true";
    /*******************************************************/
    // setup()
    /*******************************************************/
    function setup() {
        console.log(" setup: DinoClone");
        cnv = new Canvas(SCREEN_WIDTH, SCREEN_HEIGHT);
        blocks = new Group();
        ground = new Sprite(SCREEN_WIDTH / 2, SCREEN_HEIGHT, SCREEN_WIDTH, 4, 's');
        ground.color = 'black';
        world.gravity.y = 80;
        document.addEventListener("keydown",
            function(event) {
                if (blueCube.y > 356) {
                    blueCube.vel.y = -20;
                }
            });
    }

    /*******************************************************/
    // draw()
    /*******************************************************/
    function draw() {
        if (state == "start") {
            startScreen();
        }
        if (state == "game") {
            game();
        }
        if (state == 'end') {
            deathScreen();
        }
        if (score > highScore) {
            highScore = score;
        }
    }
    //this creates the blokcs for the user to jump over
    function newBlock() {
        block = new Sprite(780, 374, BLOCK_SCALE, BLOCK_SCALE, 'k');
        block.color = 'lightGreen';
        block.vel.x = blockSpeed;
        blocks.add(block);
    }
    //this is run when the player is hit
    function deathOfPlayer(_blueCube, _block) {
        console.log("playerhit");
        playerAlive = 'false';
        blueCube.remove();
    }
    /*******************************************************/
    //  APP STATE FUNCTION
    /*******************************************************/
    //this is the starting screen
    function startScreen() {
        allSprites.visible = false;
        background('lime');
        textSize(42);
        text("Welcome to Dino Clone", 50, 50);
        textSize(24);
        text("Press the space bar to start", 50, 110);
        if (kb.pressing(' ')) {
            allSprites.visible = true;
            state = "game";
            resetGame();
        }
    }
    //this is the main games code
    function game() {
        background('cyan');
        score++;
        textSize(30);
        text(("Score: " + score), 40, 100);
        if (frameCount > nextSpawn) {
            newBlock();
            nextSpawn = frameCount + random(22, 100);
        }
        if (playerAlive == 'false') {
            state = 'end';
            fb_saveScore(score, 'DCscore', 'DinoCloneHS');
        }
    }
    //this is the games death sreen
    function deathScreen() {
        allSprites.visible = false
        background('darkRed');
        textSize(32);
        text("You're dino was killed by the Clones", 50, 50);
        textSize(36);
        text("Score: " + score, 50, 82);
        text("Instance High Score: " + highScore, 50, 160);
        textSize(24);
        text("Press the p key to try again", 50, 110);
        if (kb.pressing('p')) {
            playerAlive = "true";
            state = "game"
            allSprites.visible = true;
            score = 0;
            blocks.removeAll();
            resetGame();
        }
    }
    //this helps me reset the game
    function resetGame() {
        blueCube = new Sprite(130, 356, PLAYER_SCALE, PLAYER_SCALE, 'd');
        blueCube.color = 'blue';
        blueCube.collides(blocks, deathOfPlayer);
    }
}
/*******************************************************/
//  END OF APP
/*******************************************************/