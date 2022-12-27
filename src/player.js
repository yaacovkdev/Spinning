const SIZEW = 30, SIZEH = 30;

let Player = {
    specs: {
        width: SIZEW,
        height: SIZEH,
        shape: 0,
        color: 0,
    },
    
    move: {
        x: 0,
        y: 0,
        speed: 5,
        diagspeed: 0,
    },

    gun: {
        reload: 0,
        reloadtime: 20,
        fired: false,
        safety: false, //gun safety to prevent instant shooting at the start of the reset
        shootangle: 0,
    },
    
    ammo: {
        rayspeed: 5,
        raylenth: 20,
        raywidth: 3,
        raycolor: 0
    },
};

function setPlayerSpeed(s){
    Player.move.speed = s,
    Player.move.diagspeed = diagonalSpeed(s);
}

function playerShooting(){
    if(Player.gun.reload >= Player.gun.reloadtime){
        Player.gun.fired = false;
        Player.gun.reload = 0;
        
    } else if(Player.gun.fired){
        Player.gun.reload++;
    }

    //adds an information about a ray inside the array when the player shot
    if(Player.gun.reload == 1){
        if(Player.gun.safety){
            Player.gun.safety = false;
            return;
        }
        var cosrat = Math.cos(Player.gun.shootangle);
        var sinrat = Math.sin(Player.gun.shootangle);
        rays.push(
            {
                specs:{
                    length: Player.ammo.raylenth,
                    width: Player.ammo.raywidth,
                    color: Player.ammo.raycolor,
                },

                move:{
                    angle:Player.gun.shootangle, 
                    x:Player.move.x + SIZEW * cosrat,
                    y:Player.move.y + SIZEH * sinrat,
                    x2:Player.move.x + cosrat * (SIZEW + Player.ammo.raylenth),
                    y2:Player.move.y + sinrat * (SIZEH + Player.ammo.raylenth)
                },
            }
        );
    }
}

//function that listens to keyboards
function keyboard(){
    if(mouseIsPressed){
        if(!Player.gun.fired){
            Player.gun.shootangle = direction(Player.move.x,Player.move.y,mouseX, mouseY);
        }
        Player.gun.fired = true;
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
        xadd *= Player.move.diagspeed
        yadd *= Player.move.diagspeed
    } else {
        xadd *= Player.move.speed;
        yadd *= Player.move.speed;
    }

    Player.move.x += xadd;
    Player.move.y += yadd;
}
