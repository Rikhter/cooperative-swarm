
var moduleResolver = require('ModuleResolver');

var HonourConstants = require(moduleResolver.resolvePath('HonourConstants'));

/**
 * @module Role
 */
module.exports = (function() {

  /**
   * @class
   */
  function Builder() {}

  /**
   * @returns {ConstructionSite}
   * @param {Creep} creep
   */
  Builder.findConstructionSite = function(creep) {
    return creep.room.find(FIND_CONSTRUCTION_SITES)[0];
  };

  /**
   * @returns {boolean}
   * @param {Creep} creep
   * @param {ConstructionSite} constructionSite
   */
  Builder.nextToConstructionSite = function(creep, constructionSite) {
    return creep.pos.isNearTo(constructionSite.pos);
  };

  return Builder;
})();