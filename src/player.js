const SIZEW = 30, SIZEH = 30;

let Player = {
    width: SIZEW,
    height: SIZEH,
    shape: 0,
    color: 0,
    x: 0,
    y: 0,
    speed: 5,
    diagspeed: 0,
    reload: 0,
    reloadtime: 20,
    fired: false,
    safety: false, //gun safety to prevent instant shooting at the start of the reset
    shootangle: 0,
    rayspeed: 5,
    raylenth: 20,
    raywidth: 3,
    raycolor: 0
};

function setPlayerSpeed(s){
    Player.speed = s,
    Player.diagspeed = diagonalSpeed(s);
}

function playerShooting(){
    if(Player.reload >= Player.reloadtime){
        Player.fired = false;
        Player.reload = 0;
        
    } else if(Player.fired){
        Player.reload++;
    }

    //adds an information about a ray inside the array when the player shot
    if(Player.reload == 1){
        var cosrat = Math.cos(Player.shootangle);
        var sinrat = Math.sin(Player.shootangle);
        rays.push(
            {angle:Player.shootangle,
            length: Player.raylenth,
            width: Player.raywidth,
            color: Player.raycolor,
            x:Player.x + SIZEW * cosrat,
            y:Player.y + SIZEH * sinrat,
            x2:Player.x + cosrat * (SIZEW + Player.raylenth),
            y2:Player.y + sinrat * (SIZEH + Player.raylenth)}
        );
    }
}

//function that listens to keyboards
function keyboard(){
    if(mouseIsPressed && !Player.safety){
        if(!Player.fired){
            Player.shootangle = direction(Player.x,Player.y,mouseX, mouseY);
        }
        Player.fired = true;
    } else if(!mouseIsPressed && Player.safety){
        Player.safety = false;
    }
    var controls = [false, false, false, false];
    var xadd = 0, yadd = 0, diagonal = false;
    //w
    if(keyIsDown(87)){
        controls[0] = true;
    }

    //a
    if(keyIsDown(65)){
        controls[1] = true;
    }

    //s
    if(keyIsDown(83)){
        controls[2] = true;
    }

    //d
    if(keyIsDown(68)){
        controls[3] = true;
    }

    //stops movement if opposing movement inputs and makes sure the diagonal speed is right.
    if(controls[0] && controls[2]) {controls[0] = false; controls[2] = false;}
    if(controls[1] && controls[3]) {controls[1] = false; controls[3] = false;}

    if((controls[0] || controls[2]) && (controls[1] || controls[3])) {
        diagonal = true;
    }

    if(controls[0]) yadd = -1;
    if(controls[1]) xadd = -1;
    if(controls[2]) yadd = 1;
    if(controls[3]) xadd = 1;
    
    if(diagonal){
        xadd *= Player.diagspeed
        yadd *= Player.diagspeed
    } else {
        xadd *= Player.speed;
        yadd *= Player.speed;
    }

    Player.x += xadd;
    Player.y += yadd;
}
