
var moduleResolver = require('ModuleResolver');

var should = require('should');

var main = require(moduleResolver.resolvePath('main'));

describe('main module', function() {
  it('should define the main loop function', function() {
    (main.loop).should.not.equal(undefined).and.be.a.Function();
  });
});
