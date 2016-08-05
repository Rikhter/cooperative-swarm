
var moduleResolver = require('ModuleResolver');

var HonourConstants = require(moduleResolver.resolvePath('HonourConstants'));

function createCollector(spawn) {
  var parts = [WORK, CARRY, CARRY, MOVE, MOVE];
  var memory = { role: HonourConstants.Roles.WORKER };

  spawn.createCreep(parts, memory);
}

function findNearestSource(creep) {
  var sources = creep.room.find(FIND_SOURCES);

  var nearestSource = sources[0];
  var minDistance = Number.MAX_VALUE;

  for (var i = 0; i < sources.length; i++) {
    var distance = calculateDistance(creep, sources[i]);
    if (distance < minDistance) {
      nearestSource = sources[i];
      minDistance = distance;
    }
  }
  return nearestSource;
}

function doHarvestSequence(creep) {
  var source = findNearestSource(creep);
  if (creep.pos.isNearTo(source.pos.x, source.pos.y)) {
    creep.harvest(source);
  } else {
    creep.moveTo(source);
  }
}

function isFull(creep) {
  return creep.carryCapacity == creep.carry.energy;
}

function calculateDistance(roomObjectA, roomObjectB) {
  var deltaXSqr = Math.pow(roomObjectB.pos.x - roomObjectA.pos.x, 2);
  var deltaYSqr = Math.pow(roomObjectB.pos.y - roomObjectA.pos.y, 2);
  return Math.sqrt(deltaXSqr + deltaYSqr);
}

var roleCollector = {
  createCollector: createCollector,
  findNearestSource: findNearestSource,
  doHarvestSequence: doHarvestSequence,
  isFull: isFull
};

module.exports = roleCollector;