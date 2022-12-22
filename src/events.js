//Will probably be changed to a json file
let spawnEnemiesEvent;
let Events = [];

class GameEvent {

    //interpreted in ticks
    constructor(name, delay, interval){
        this.name = name;
        this.delay = delay;
        this.interval = interval;
        this.counter = 0;
    }
    eventfunction(){}
}

function initEvents(){
    GameEvent.prototype.eventfunction = createEnemy;
    spawnEnemiesEvent = new GameEvent("SpawnEnemies", 0, 10);   
}

function progressEvents(){
    //delay
    for(var i in Events){
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