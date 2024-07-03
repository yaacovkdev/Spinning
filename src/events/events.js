//Will probably be changed to a json file
let spawnEnemiesEvent;
let incrementEnemiesTime;
let incrementReload;
let incrementEnemiesSpeed;

var Events = [];

class TimeEvent {
  //interpreted in ticks
  constructor(name, delay, interval, eventfunction, parameterarray) {
    this.name = name;
    this.delay = delay;
    this.interval = interval;
    this.counter = 0;
    this.eventfunction = eventfunction;
    this.parameterarray = parameterarray;
  }
}

function initEvents() {
  spawnEnemiesEvent = new TimeEvent(
    "SpawnEnemies",
    20,
    30,
    createEnemy,
    [1, 6]
  );
  incrementEnemiesTime = new TimeEvent(
    "IncrementEnemiesSpawn",
    0,
    60,
    incrementEventTime,
    [spawnEnemiesEvent, -1]
  );
  incrementReload = new TimeEvent("IncrementReload", 0, 60, setGun, []);

  incrementEnemiesSpeed = new TimeEvent(
    "IncrementEnemiesSpeed",
    0,
    45 * 20,
    setEventParameters,
    [spawnEnemiesEvent, 1]
  );

  Events.push(spawnEnemiesEvent);
  Events.push(incrementEnemiesTime);
  Events.push(incrementReload);
  Events.push(incrementEnemiesSpeed);
}

function progressEvents() {
  for (var i in Events) {
    //delay
    if (Events[i].delay > 0) {
      Events[i].delay--;
      continue;
    }

    if (Events[i].counter < Events[i].interval) {
      Events[i].counter++;
    } else {
      Events[i].counter = 0;
      Events[i].eventfunction(...Events[i].parameterarray);
    }
  }
}

let incrementEventTime = function (event, n) {
  if (event.interval <= 1) return;
  event.interval += n;
};

let setEventParameters = function (event, n) {
  event.parameterarray[0] += n;
  event.parameterarray[1] += n;
};
