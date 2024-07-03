let bcolor = [0,0,0];
let colors = ["white", "red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "light gray"];
const CANVSIZEX = 1200, CANVSIZEY = 675;

document.getElementById("b").style.background = "rgb(0,0,0)";

function setup(){
    var C = createCanvas(CANVSIZEX,CANVSIZEY);
    setPlayerSpeed(Player.move.speed);
    Player.move.x = CANVSIZEX/2;
    Player.move.y = CANVSIZEY/2;
    C.parent("canvasdiv");
    C.style("display:block; margin-left: auto; margin-right:auto; margin-top: 100px; border-style: solid; border-width: 5px; border-color: darkblue;");
    
    //defaults
    fill(colors[Player.specs.color]);
    stroke(colors[0]);
    strokeWeight(Player.ammo.raywidth);
    smooth();
    frameRate(60);
    
    initEvents();
    beginEventLoop();
}

function draw(){
    background(bcolor[0], bcolor[1], bcolor[2]);
    keyboard();
    border();
    renderPlayer();
    renderRays();
    renderEnemies();
    playerShooting();
    checkCollisions();
    updateMovements();
    checkOver();
}

function renderPlayer(){
    
    //just render the shape with internal tools
    if(Player.specs.shape == 0){
        rect(Player.move.x-Player.specs.width/2, Player.move.y-Player.specs.height/2, Player.specs.width, Player.specs.height);
    } else if(Playe.specs.shape == 1){
        circle(Player.move.x, Player.move.y, Player.specs.width);
    }

}

function renderRays(){
    
    for(var i = 0; i < rays.length; i++){
        //draw the line
        line(rays[i].move.x, rays[i].move.y, rays[i].move.x2, rays[i].move.y2);
    }
}

function renderEnemies(){
    push();
    fill(colors[1]);
    stroke(colors[1]);
    for(var i = 0; i < enemies.length; i++){
        if(enemies[i].specs.shape == 0)
            rect(enemies[i].move.x-enemies[i].specs.width/2, enemies[i].move.y-enemies[i].specs.height, enemies[i].specs.width, enemies[i].specs.height);
        else if(enemies[i].specs.shape == 1){
            circle(enemies[i].move.x, enemies[i].move.y, enemies[i].specs.width);
        }
    }
    pop();
}

function checkOver(){
    if(gameOver){
        background("black");
        push();
        textAlign(CENTER, CENTER);
        textSize(100);
        fill(colors[0]);
        text('Game Over', width/2, height/2 -100);
        text('Score: '+score, width/2, height/2 +100);
        pop();
        endLoop();
        noLoop();
    }
}