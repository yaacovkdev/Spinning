//Will probably be changed to a json file
let spawnEnemiesEvent;
let incrementEnemiesTime;

let Events = [];

class TimeEvent {
    //interpreted in ticks
    constructor(name, delay, interval, eventfunction, parameterarray){
        this.name = name;
        this.delay = delay;
        this.interval = interval;
        this.counter = 0;
        this.eventfunction = eventfunction;
        this.parameterarray = parameterarray;
    }

    //eventfunction = function(){}
}

function initEvents(){
    spawnEnemiesEvent = new TimeEvent("SpawnEnemies", 20, 30, createEnemy, []);
    incrementEnemiesTime = new TimeEvent("IncrementEnemiesSpawn", 0, 60, incrementEventTime, [spawnEnemiesEvent, -1]);

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
            Events[i].eventfunction(...Events[i].parameterarray);
        }
    }
}