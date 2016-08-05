
var should = require('should');
var sinon = require('sinon');

var moduleResolver = require('ModuleResolver');

var HonourConstants = require(moduleResolver.resolvePath('HonourConstants'));
var HonourLoop = require(moduleResolver.resolvePath('HonourLoop'));

var ScreepsApi = require('ScreepsApi');
var Game = ScreepsApi.Game,
    Spawn = ScreepsApi.StructureSpawn,
    Room = ScreepsApi.Room,
    Resource = ScreepsApi.Resource,
    RoomPosition = ScreepsApi.RoomPosition,
    Creep = ScreepsApi.Creep;

CREEP_QUEEN = HonourConstants.CREEP_QUEEN;
MAIN_SPAWN = HonourConstants.MAIN_SPAWN;

describe('HonourLoop:', function() {

  it('should exist', function() {
    should.exist(HonourLoop);
  });

  describe('constructor:', function() {
    it('should attach the passed object to itself', function() {
      var theLoop = new HonourLoop({ a: 1 });
      (theLoop.game).should.deepEqual({ a: 1 });
    });
  });
  describe('run:', function() {


    describe('call required creeps:', function() {
      describe('when there are no creeps in game:', function () {
        it('should create one creeper', function () {
          Game.spawns[MAIN_SPAWN] = new Spawn();

          var spawnMock = sinon.mock(Game.spawns[MAIN_SPAWN]);
          spawnMock.expects("createCreep")
              .withArgs([MOVE, WORK, CARRY], CREEP_QUEEN).once();

          var theLoop = new HonourLoop(Game);

          theLoop.run();

          spawnMock.verify();
        });
      });

      describe('when there is one creeper in game:', function () {
        it('should not create any more creeps', function () {
          Game.spawns[MAIN_SPAWN] = new Spawn();

          Game.creeps = {};
          Game.creeps[CREEP_QUEEN] = new Creep();

          var spawnMock = sinon.mock(Game.spawns[MAIN_SPAWN]);
          spawnMock.expects("createCreep").never();

          var theLoop = new HonourLoop(Game);
          theLoop.run();

          spawnMock.verify();
        });
      });
    });

    describe('instruct available creep:', function() {
      describe('should send creep to harvest:', function() {
        it('should find resource', function() {
          Game.creeps = {};
          Game.creeps[CREEP_QUEEN] = new Creep();
          Game.creeps[CREEP_QUEEN].room = new Room();

          var mockRoom = sinon.mock(Game.creeps[CREEP_QUEEN].room);
          mockRoom.expects('find').withArgs(FIND_SOURCES).once();

          var theLoop = new HonourLoop(Game);
          theLoop.run();

          mockRoom.verify();
        });

        it('should instruct creep to harvest the resource', function() {
          var source = new Resource();

          var room = new Room();
          sinon.stub(room, 'find').withArgs(FIND_SOURCES).returns([source]);

          var creeper = new Creep();
          creeper.room = room;

          Game.creeps = {};
          Game.creeps[CREEP_QUEEN] = creeper;

          var mockCreep = sinon.mock(creeper);
          mockCreep.expects('harvest').withArgs(source).once();

          var theLoop = new HonourLoop(Game);
          theLoop.run();

          mockCreep.verify();
        });
      });
    });
  })
});
