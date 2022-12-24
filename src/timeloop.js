let mainInterval;
const tickrate = 20;

function beginEventLoop(){
    console.log('we begin');
    if(!mainInterval) mainInterval = setInterval(function(){
        progressEvents();
    },1000/tickrate);
}

function endLoop(){
    console.log('we ended');
    //clearInterval(mainInterval);
    Events = [];
}