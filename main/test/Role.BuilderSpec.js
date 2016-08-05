
var screepsApi = require('ScreepsApi');

Creep = screepsApi.Creep;
Room = screepsApi.Room;
RoomPosition = screepsApi.RoomPosition;
ConstructionSite = screepsApi.ConstructionSite;

var should = require('should');
var sinon = require('sinon');

var moduleResolver = require('ModuleResolver');

var Builder = require(moduleResolver.resolvePath('Role.Builder'));
var HonourConstants = require(moduleResolver.resolvePath('HonourConstants'));

describe('Role - Builder', function() {

  describe('build', function() {

    describe('find construction site', function() {
      var creep = new Creep();
      creep.room = new Room();

      var targetBuildSite = new ConstructionSite();
      var otherBuildSite = new ConstructionSite();

      it('should find the first available structure', function() {
        var mockRoom = sinon.mock(creep.room);
        mockRoom.expects('find').withArgs(FIND_CONSTRUCTION_SITES).returns([targetBuildSite, otherBuildSite]).once();

        (Builder.findConstructionSite(creep)).should.equal(targetBuildSite);
      });
    });

    describe('next to construction site', function() {
      var creep = new Creep();
      creep.pos = new RoomPosition();

      var targetBuildSite = new ConstructionSite();
      targetBuildSite.pos = new RoomPosition();

      it('should return result of the isNearTo function', function() {
        var mockRoomPosition = sinon.mock(creep.pos);
        mockRoomPosition.expects('isNearTo').withArgs(targetBuildSite.pos).returns(true);

        (Builder.nextToConstructionSite(creep, targetBuildSite)).should.be.True();
      });
    });

    describe('when next to ')

  });
});
