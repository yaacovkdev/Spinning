let rays = [];
let enemies = [];
let counter = 0;
let score = 0;
let gameOver = false;

function spawnEnemies(){
    if(counter >= 10){
        counter = 0;
        createEnemy();
    }
    
    counter++;
}

let createEnemy = function(){
    
    var px = CANVSIZEX+(2 * SIZEW);
    var py = CANVSIZEY+(2 * SIZEH);
    var pos = randomRectPerimiterPos(px,py);
    var target = randomRectPerimiterPos(px/3, py/3);
    pos[0] -= SIZEW;
    pos[1] -= SIZEH;
    target[0] -= SIZEW;
    target[1] -= SIZEH;
    var angle = direction(pos[0], pos[1], target[0]+px/3, target[1]+py/3);
    

    var enemy = {
        width: SIZEW,
        height: SIZEH,
        speed: int(random(1,5)),
        shape: 1,
        color: colors[1],
        angle: angle, 
        x:pos[0],
        y:pos[1],

    };
    enemies.push(enemy);
}

function checkCollisions(){
    for(var i = 0; i < enemies.length; i++){
        if(interceptCircRect(enemies[i], Player)){ 
            gameOver = true;
        }
    }
    
    
    for(var i = 0; i < rays.length; i++){
        var l1 = {x:rays[i].x, y:rays[i].y};
        var l2 = {x:rays[i].x2, y:rays[i].y2};
        var s1,s2;
        if(Player.shape == 0){
            //player thing
            s1 = {x:Player.x - Player.width/2, y:Player.y - Player.height / 2};
            s2 = {x:s1.x+Player.width, y:s1.y+Player.height};

            if(interceptLineRect(l1,l2,s1,s2)){
                rays.splice(i,1);
                //i--;
            }
        } else if(Player.shape == 1){
            s1 = {x:Player.x, y:Player.y};
            s2 = Player.width/2;

            if(interceptLineCirc(l1,l2,s1,s2)){
                rays.splice(i,1);
                //i--;
            }
        }

        //Collisions of rays with enemies
        for(var j = 0; j < enemies.length; j++){
            if(isOutOfBound(enemies[j],enemies[j].width)) continue;
            if(enemies[j].shape==0){
                s1 = {x:enemies[j].x-enemies[j].width/2, y:enemies[j].y-enemies[j].height/2};
                s2 = {x:s1.x+enemies[j].width, y:s1.y+enemies[j].height};

                if(interceptLineRect(l1,l2,s1,s2)){
                    rays.splice(i,1);
                    //i--;
                    enemies.splice(j,1);
                    //j--;
                    score++;
                }
            }  else if(enemies[j].shape ==1){

                s1 = {x:enemies[j].x, y:enemies[j].y};
                s2 = enemies[j].width/2;

                if(interceptLineCirc(l1,l2,s1,s2)){
                    rays.splice(i,1);
                    enemies.splice(j,1);
                    score++;
                }       
            }

        }
    }

    for(var i = 0; i < enemies.length; i++){
        for(var j = 0; j < enemies.length; j++){
            if(i == j) continue;
            if(interceptCircs(enemies[i], enemies[j])){
                
                //in order to splice at the right element in the enemies array second time
                if(i<j) j--;
                
                enemies.splice(i,1);
                enemies.splice(j,1);
                score++;
            }
        }
        
    }
    
}

//checks for borders in order to not go over the canvas
function border(){
    if(Player.x >= CANVSIZEX - 15) Player.x = CANVSIZEX - 15;
    if(Player.x <= 15) Player.x = 15;
    if(Player.y >= CANVSIZEY - 15) Player.y = CANVSIZEY - 15;
    if(Player.y <= 15) Player.y = 15;
}

function updateMovements(){
    for(var i = 0; i < rays.length; i++){
        //add the next speed
        var xincrease = Player.rayspeed * Math.cos(rays[i].angle);
        var yincrease = Player.rayspeed * Math.sin(rays[i].angle);

        rays[i].x += xincrease;
        rays[i].y += yincrease;
        rays[i].x2 += xincrease;
        rays[i].y2 += yincrease;
        
        if(isOutOfBound(rays[i], 50)) {rays.splice(i,1);}
        
    }
    
   
    
    for(var i = 0; i < enemies.length; i++){
        var ddir = direction(enemies[i].x,enemies[i].y,Player.x, Player.y);
        //ddir = closestAngle(enemies[i].angle, ddir, Math.PI/10);
        enemies[i].x += enemies[i].speed*Math.cos(ddir);
        enemies[i].y += enemies[i].speed*Math.sin(ddir);

        if(isOutOfBound(enemies[i], 50)) {enemies.splice(i,1); i--;}
    }
}

function isOutOfBound(renderobject, roomdist){
    if(renderobject.x >= (width+roomdist) || renderobject.x <= (-roomdist) || renderobject.y >= (height+roomdist) || renderobject.y <= (-roomdist)) return true;
    return false;
}

function resetGame(){
    enemies = [];
    rays = [];
    Player.x = width/2;
    Player.y = height/2;
    score = 0;
}

function mousePressed(){
    if(gameOver){
        gameOver = false;
        resetGame();
        loop();
    }
}