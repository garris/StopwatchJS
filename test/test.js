

var expect = chai.expect;

mocha.setup({
  ui:'bdd'
});

describe("stopwatch defaults", function() {

  var sw;

  describe("arguments test", function(){
    it('starts when initalized by default', function() {
      sw = new Stopwatch();
      expect(sw.isRunning()).to.be.true;
      expect(sw.startTime).to.be.above(0);
      expect(sw.stopTime).to.be.equal(0);
    });
    it('is optionally stopped when initalized', function() {
      sw = new Stopwatch('stopped on init', null, false);
      expect(sw.isRunning()).to.be.false;
    });
    it('stops when stopped', function() {
      sw = new Stopwatch();
      sw.stop(true);
      expect(sw.isRunning()).to.be.false;
      expect(sw.stopTime).to.be.above(0);
    });
    // it('default resolution is 1ms', function() {
    //   sw = new Stopwatch();
    //   doBusyWork(0)
    //   sw.stop(true);
    //   expect(sw.selfTime).to.be.equal(0); //this could fail -- just fudging here.
    // });
    // it('setting resolution works', function() {
    //   sw = new Stopwatch('test resolution', 10);
    //   doBusyWork(0)
    //   sw.stop(true);
    //   expect(sw.selfTime).to.be.above(0); // this could also fail -- just fudging here.
    // });
  });



  describe("start and stop", function(){
    it('measures with multiple start and stop calls', function() {
      sw = new Stopwatch();
      doBusyWork(100);
      sw.stop(true);
      expect(sw.selfTime).to.be.within(95, 105);
      sw.start();
      doBusyWork(100);
      sw.stop(true);
      expect(sw.selfTime).to.be.within(95, 105);
    });
  });


  describe("laps", function(){
    it('measures mulitple laps & calcs avg', function() {
      sw = new Stopwatch('lap-test');
      doBusyWork(100);
      sw.lap('first', true);
      doBusyWork(50);
      sw.lap(null, true);
      doBusyWork(75);
      sw.lap('last', true);
      sw.stop(true);
      expect(sw.selfTime).to.be.within(220, 230);
      expect(sw.getAvgLapTime(true)).to.be.within(70, 80);
      expect(sw.getAvgLapTime(true, 2)).to.be.within(61, 64 );
    });
  });


  function doBusyWork(delay){
    var endTime = new Date().getTime() + delay;
    while (endTime > new Date().getTime()) {
      var x = Math.sin(3);
    }
  }


});

mocha.run();




