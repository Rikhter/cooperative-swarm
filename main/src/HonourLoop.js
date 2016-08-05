
var moduleResolver = require('ModuleResolver');

var CollectorRole = require(moduleResolver.resolvePath('Role.Collector'));
var HonourConstants = require(moduleResolver.resolvePath('HonourConstants'));

module.exports = (function() {
  function HonourLoop(dependencies) {
    for(var dependency in dependencies) {
      this[dependency] = dependencies[dependency];
    }
  }

  HonourLoop.prototype.run = function() {
    var creepCount = 0;
    var creeps = this.game.creeps;
    for(var i in creeps) {
      CollectorRole.doHarvestSequence(creeps[i]);
      creepCount++;
    }

    if(creepCount < 2) {
      var spawn = this.game.spawns[HonourConstants.SPAWN_NAME];
      CollectorRole.createCollector(spawn);
    }
  };

  return HonourLoop;
})();

