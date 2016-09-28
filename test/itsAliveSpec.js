var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);

var expect = require('chai').expect

describe('testing suite', function () {
  it('does math', function () {
    var addition = 2 + 2;
    expect(addition).to.equal(4);
  });
});


describe('spy calls', function () {
  it('counts the num times a function is invoked', function () {
    var array = [1,2,3];
    function testFunction() {
      console.log( 'potato' );
    }

    var spy = chai.spy(testFunction);

    array.forEach(spy);//obj.testFunction())

    expect(spy).to.have.been.called.exactly(3);
  });
});
