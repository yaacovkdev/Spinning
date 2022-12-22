let mainInterval;
const tickrate = 20;

function initEventLoop(){
    Events.push(spawnEnemiesEvent);
    console.log('Success');
}

function beginLoop(){
    if(!mainInterval) mainInterval = setInterval(function(){
        border();
        progressEvents();
        checkOver();
    },1000/tickrate);
}

function endLoop(){
    clearInterval(mainInterval);
}