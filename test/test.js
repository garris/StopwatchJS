

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

    it('default resolution is rounded to the whole ms', function() {
      sw = new Stopwatch('resolution-test-1');
      doBusyWork(50);
      sw.stop();
      expect(/^\d\d$/.test(sw.getStopTime(true).toString())).to.be.true; // this is a crude test for a non-decimal value
    });
    it('increasing resolution works', function() {
      sw = new Stopwatch('resolution-test-2', 10);
      doBusyWork(50);
      sw.stop();
      expect(/^\d\d\.\d+/.test(sw.getStopTime(true).toString())).to.be.true; // this is a crude test for a decimal value
    });
  });



  describe("start and stop", function(){
    it('measures with multiple start and stop calls', function() {
      sw = new Stopwatch();
      doBusyWork(100);
      sw.stop(true);
      expect(sw.selfTime).to.be.within(95, 105);
      sw.start();
      doBusyWork(160);
      sw.stop(true);
      expect(sw.selfTime).to.be.within(155, 165);
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
      expect(sw.selfTime).to.be.within(224, 226);
      expect(sw.getAvgLapTime(true)).to.be.within(74, 76);
      expect(sw.getAvgLapTime(true, 2)).to.be.within(61.5, 63.5);
      expect(sw.getAvgLapTime(true, -2)).to.be.within(74, 76);

      var rts = sw.getLaps('running');
      var sts = sw.getLaps('self');
      var labels = sw.getLaps().map(function(o) {return o.label});

      expect(rts[0]).to.be.within(99, 101);
      expect(rts[1]).to.be.within(149, 151);
      expect(rts[2]).to.be.within(224, 226);

      expect(sts[0]).to.be.within(99, 101);
      expect(sts[1]).to.be.within(49, 51);
      expect(sts[2]).to.be.within(74, 76);

      expect(labels[0]).to.equal('first');
      expect(labels[1]).to.equal('lap');
      expect(labels[2]).to.equal('last');

      expect(sw.getLapMean(true)).to.equal(75);
      expect(sw.getLapStdDev(true)).to.within(19, 21);

      console.log('lap dump', sw.getLaps(), rts, sts, labels)
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




