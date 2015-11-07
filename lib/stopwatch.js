/**
 *  Stopwatch
 *  @param {str} [labels] stopwatch instance
 *  @param {int} [resolution] integer sets sub-milisecond accuracy level e.g. 1 = 0.0, 2 = 0.00, 3 = 0.000
 *  @param {bool} [autoStart] defaults to true. if set to false will not autoStart when initalized
 */

function Stopwatch(label, resolution, autoStart) {
  var defaultLabel = 'stopwatch';
  var defaultLapLabel = 'lap';
  var defaultLapAvgLabel = 'avg time';
  var defaultLapAvgPerSecLabel = 'avg/sec';
  var msLabel = 'ms';

  if (!resolution) {
    resolution = 0;
  }
  resolution = Math.pow(10, resolution);

  if (!label) {
    label = defaultLabel;
  }

  this.label = label;

  function getRounded(x) {
    return Math.round(x * resolution) / resolution;
  }

  function getRoundedDelta(a, b) {
    return getRounded(a - b);
  }

  this.getTime = function() {
    return getRounded(window.performance.now());
  };

  this._isRunning = false;

  this.isRunning = function() {
    return this._isRunning;
  }
  this.hasPushedLap = false;
  this.laps = [];

  this.start = function(keepLapData) {
    if (!this.hasPushedLap && !keepLapData) {
      this.laps.length = 0;
    }
    this.lastLapTime = 0;
    this.startTime = 0;
    this.stopTime = 0;
    this.selfTime = 0;
    this.startTime = this.getTime();
    this._isRunning = true;
  };

  this.stop = function(toConsole, pushLap) {
    this.stopTime = this.getTime();
    this.selfTime = getRoundedDelta(this.stopTime, this.startTime);
    if (toConsole) {
      console.log(label + ' ' + this.selfTime + "ms")
    }
    this._isRunning = false;
    if (pushLap) {
      this.hasPushedLap = true;
      this.lap(null, false, this.selfTime)
    }
    return this.selfTime;
  };

  this.lap = function(lapLabel, toConsole, selfTime) {
    var lapTime, lapSelfTime;

    if (selfTime) {
      lapSelfTime = selfTime;
    } else {
      lapTime = this.getTime();
      if (!this.lastLapTime) {
        this.lastLapTime = this.startTime;
      }
      lapSelfTime = getRoundedDelta(lapTime, this.lastLapTime);
    }

    if (!lapLabel) {
      lapLabel = defaultLapLabel;
    }

    this.laps.push({
      id: this.laps.length,
      label: lapLabel,
      time: lapTime,
      self: lapSelfTime
    });
    this.lastLapTime = lapTime;
    if (toConsole) {
      console.log(lapLabel + ' ' + lapSelfTime + "ms")
    }
    return lapSelfTime;
  };


  this.getLaps = function(pluckTime) {
    if (pluckTime) {
      return this.laps.map(function(o) {
        return o.self;
      })
    } else {
      return this.laps;
    }
  }

  /**
   * getAvgLapTime returns avg of lap times
   * @param  {bool} toConsole logs result to console when true
   * @param  {int} slice will only average the n last laps
   * @return {float}          avg of lap times
   */
  this.getAvgLapTime = function(toConsole, slice) {
    var lapArr = this.getLaps(true);

    if (!lapArr) {
      return;
    }
    if (!slice) {
      slice = 0;
    }
    if (!lapArr.length) {
      return;
    }
    var sliced = lapArr.slice(-slice);
    var avg = !sliced.length || getRounded(sliced.reduce(function(a, b){return a + b}, 0) / sliced.length);
    if (toConsole) {
      console.log(defaultLapAvgLabel + ' ' + avg + msLabel)
    }
    return avg;
  }

  this.getAvgLapsPerSec = function(toConsole, slice) {
    var avg = 1000 / this.getAvgLapTime(false, slice);
    if (toConsole) {
      console.log(defaultLapAvgPerSecLabel + ' ' + avg + msLabel)
    }
  }

  if(autoStart !== false) {
    this.start();
  }
}
