let bcolor = [0,0,0];
let colors = ["white", "red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "light gray"];
const CANVSIZEX = 1200, CANVSIZEY = 675;

document.getElementById("b").style.background = "rgb(0,0,0)";

function setup(){
    var C = createCanvas(CANVSIZEX,CANVSIZEY);
    changePlayerSpeed(Player.speed);
    Player.x = CANVSIZEX/2;
    Player.y = CANVSIZEY/2;
    C.parent("canvasdiv");
    C.style("display:block; margin-left: auto; margin-right:auto; margin-top: 100px; border-style: solid; border-width: 5px; border-color: darkblue;");
    
    //defaults
    fill(colors[Player.color]);
    stroke(colors[0]);
    strokeWeight(Player.raywidth);
    smooth();
    frameRate(60);
    
    initEvents();
    beginLoop();
}

function draw(){
    background(bcolor[0], bcolor[1], bcolor[2]);
    keyboard();
    playerShooting();
    renderPlayer();
    renderRays();
    renderEnemies();
    checkCollisions();
    updateMovements();
    checkOver();
}


/*//changes canvas on window resize
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}*/


function renderPlayer(){
    
    //just render the shape with internal tools
    if(Player.shape == 0){
        rect(Player.x-Player.width/2, Player.y-Player.height/2, Player.width, Player.height);
    } else if(Player.shape == 1){
        circle(Player.x, Player.y, Player.width);
    }

}

function renderRays(){
    
    for(var i = 0; i < rays.length; i++){
        //draw the line
        line(rays[i].x, rays[i].y, rays[i].x2,  rays[i].y2);
        
    }
}

function renderEnemies(){
    push();
    fill(colors[1]);
    stroke(colors[1]);
    for(var i = 0; i < enemies.length; i++){
        if(enemies[i].shape == 0)
            rect(enemies[i].x-enemies[i].width/2, enemies[i].y-enemies[i].height, enemies[i].width, enemies[i].height);
        else if(enemies[i].shape == 1){
            circle(enemies[i].x, enemies[i].y, enemies[i].width);
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
        noLoop();
    }
}



