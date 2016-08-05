
var screepsApi = require('ScreepsApi');

var Creep = screepsApi.Creep,
    Room = screepsApi.Room,
    RoomPosition = screepsApi.RoomPosition,
    Spawn = screepsApi.StructureSpawn,
    Source = screepsApi.Source;

var expect = require('chai').expect;
var sinon = require('sinon');

var moduleResolver = require('ModuleResolver');

var CollectorRole = require(moduleResolver.resolvePath('Role.Collector'));
var HonourConstants = require(moduleResolver.resolvePath('HonourConstants'));

function attachPositionToRoomObject(roomObject, xPos, yPos) {
  roomObject.pos = new RoomPosition();
  roomObject.pos.x = xPos;
  roomObject.pos.y = yPos;
}

describe('Role - Worker', function() {

  describe('create worker', function() {
    it('should create a new creep that has is marked as a worker creep', function() {
      var spawn = new Spawn();
      var spawnMock = sinon.mock(spawn);

      var expectedParts = [WORK, CARRY, CARRY, MOVE, MOVE];
      var expectedMemory = { role: HonourConstants.Roles.WORKER };

      spawnMock.expects('createCreep').withArgs(expectedParts, expectedMemory).once();

      CollectorRole.createCollector(spawn);

      spawnMock.verify();
    });
  });

  describe('harvest', function() {
    var creep, farSource, nearSource;

    beforeEach(function() {
      creep = new Creep();
      creep.room = new Room();
      farSource = new Source();
      nearSource = new Source();
      attachPositionToRoomObject(creep, 0, 0);
      attachPositionToRoomObject(farSource, 2, 2);
      attachPositionToRoomObject(nearSource, 1, 1);
    });

    describe('find nearest source', function() {
      it('should return the nearest source', function() {
        var mockRoom = sinon.mock(creep.room);
        mockRoom.expects('find').withArgs(FIND_SOURCES).returns([farSource, nearSource]).once();

        expect(CollectorRole.findNearestSource(creep)).to.equal(nearSource);
      });

      it('should return the nearest source', function() {
        attachPositionToRoomObject(creep, 32, 22);
        attachPositionToRoomObject(farSource, 6, 44);
        attachPositionToRoomObject(nearSource, 35, 20);

        var mockRoom = sinon.mock(creep.room);
        mockRoom.expects('find').withArgs(FIND_SOURCES).returns([farSource, nearSource]).once();

        expect(CollectorRole.findNearestSource(creep)).to.equal(nearSource);
      });
    });

    it('should harvest if adjacent', function() {
      sinon.stub(creep.room, 'find').withArgs(FIND_SOURCES).returns([farSource, nearSource]);

      sinon.stub(creep.pos, 'isNearTo').returns(true);

      var creepMock = sinon.mock(creep);
      creepMock.expects('harvest').withArgs(nearSource).once();

      CollectorRole.doHarvestSequence(creep);

      creepMock.verify();
    });

    it('should move to source if not adjacent', function() {
      sinon.stub(creep.room, 'find').withArgs(FIND_SOURCES).returns([farSource]);

      var creepMock = sinon.mock(creep);
      creepMock.expects('moveTo').withArgs(farSource).once();

      CollectorRole.doHarvestSequence(creep);

      creepMock.verify();
    });
  });

  describe('is full', function() {
    it('should return true when carry module is holding max energy.', function() {
      var creep = new Creep();

      creep.carryCapacity = 50;
      creep.carry.energy = 50;

      expect(CollectorRole.isFull(creep)).to.equal(true);
    });

    it('should return false when carry module is not holding maximum energy.', function() {
      var creep = new Creep();

      creep.carryCapacity = 50;
      creep.carry.energy = 42;

      expect(CollectorRole.isFull(creep)).to.equal(false);
    })
  });
});
