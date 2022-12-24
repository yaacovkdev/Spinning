//Will probably be changed to a json file
let spawnEnemiesEvent;
let Events = [];

class GameEvent {
    eventfunction = function(){}
    //interpreted in ticks
    constructor(name, delay, interval){
        this.name = name;
        this.delay = delay;
        this.interval = interval;
        this.counter = 0;
    }

    //eventfunction(){}
}

function initEvents(){
    //GameEvent.prototype.eventfunction = function(){};

    spawnEnemiesEvent = new GameEvent("SpawnEnemies", 20, 30);
    spawnEnemiesEvent.eventfunction = createEnemy;

    incrementEnemiesTime = new GameEvent("IncrementEnemiesSpawn", 0, 60);
    incrementEnemiesTime.eventfunction = incrementSpawnEnemy;

    Events.push(spawnEnemiesEvent);
    Events.push(incrementEnemiesTime);
}

function progressEvents(){
    for(var i in Events){
        //delay
        if(Events[i].delay > 0){
            Events[i].delay--;
            continue;
        }

        if(Events[i].counter < Events[i].interval){
            Events[i].counter++;
        } else{
            Events[i].counter = 0;
            Events[i].eventfunction();
        }
    }
}