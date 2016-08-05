
var moduleResolver = require('ModuleResolver');

var HonourConstants = require(moduleResolver.resolvePath('HonourConstants'));
CREEP_QUEEN = HonourConstants.CREEP_QUEEN;
MAIN_SPAWN = HonourConstants.MAIN_SPAWN;

module.exports = (function() {
  /**
   * @param {Game} game
   * @class
   */
  function HonourLoop(game) {
    this.game = game;
  }

  /**
   * @type {Game}
   */
  HonourLoop.prototype.game = {};

  HonourLoop.prototype.run = function() {
    if(Object.keys(this.game.creeps).length != 1) {
      this.game.spawns[MAIN_SPAWN].createCreep([MOVE, WORK, CARRY], CREEP_QUEEN);
    } else {
      var creep = this.game.creeps[CREEP_QUEEN];
      if (creep != undefined && creep.room != undefined) {
        var sources = creep.room.find(FIND_SOURCES);
        if (sources != undefined) {
          creep.harvest(sources[0]);
        }
      }
    }
  };

  return HonourLoop;
})();

