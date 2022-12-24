let mainInterval;
const tickrate = 20;

function beginEventLoop(){
    if(!mainInterval) mainInterval = setInterval(function(){
        progressEvents();
    },1000/tickrate);
}

function endLoop(){
    clearInterval(mainInterval);
    mainInterval = null;
    Events = [];
}