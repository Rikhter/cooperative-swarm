
module.exports = (function() {
  var main = {};
  main.loop = function() {
    var moduleResolver = require('ModuleResolver');
    moduleResolver.setInGame(Game != undefined || Game != null);

    var HonourLoop = require(moduleResolver.resolvePath('HonourLoop'));

    var options = { game: Game };
    var honourLoop = new HonourLoop(options);
    honourLoop.run();
  };
  return main;
})();
