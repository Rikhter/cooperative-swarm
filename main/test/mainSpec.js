
var moduleResolver = require('ModuleResolver');

var expect = require('chai').expect;

var main = require(moduleResolver.resolvePath('main'));

describe('main module', function() {
  it('should define the main loop function', function() {
    expect(main).to.have.property('loop');
  });
});
