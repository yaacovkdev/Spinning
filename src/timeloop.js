let mainInterval;
const tickrate = 20;

function beginLoop(){
    if(!mainInterval) mainInterval = setInterval(function(){
        progressEvents();
    },1000/tickrate);
}

function endLoop(){
    clearInterval(mainInterval);
}