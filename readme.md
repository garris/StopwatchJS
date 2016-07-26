#Stopwatch.js

This is a stopwatch on steroids. It works like a conventional stopwatch but it can also keep a log of start-stop time durations to enable things like periodic averages with standard deviation.
 
IOW: This is useful if you have a JS loop process you want to test over and over again. 


##Install

```
<script defer src="lib/stopwatch.js"></script>
```

##API


`var sw = new Stopwatch(label, resolution, autoStart);`
[label] Defaults to 'stopwatch'
[resolution] Integer sets sub-milisecond rounding e.g. 1 = 0.0, 2 = 0.00, 3 = 0.000
[autoStart] Defaults to true. if set to false will not autoStart when initalized

`sw.start();` 
Sets/resets stopwatch.

`sw.stop(toConsole);` 
Stops the stopwatch and returns duration in ms.  Setting toConsole true logs stop time to console. 

`sw.stopLap(toConsole);` 
Stops the stopwatch and returns duration in ms.  Setting toConsole true logs stopLap time to console. Remember to call `start()` again before calling `stopLap()` or your results will probably not be what you wanted.

`sw.isRunning();`
Returns true if running.

`sw.lap(lapLabel, toConsole, [selfTime])`
Lap pushes a lap object into an internal array `sw.laps`.
lapLabel defaults to 'lap'
Setting toConsole true logs lap time to console.
Optionally include `selfTime` to record arbitrary lap durations.

`sw.getMeanLapTime(toConsole [, tail])`
Returns average of all lap times.
Setting toConsole true logs average lap time to console.
Including a tail value (integer) will limit the average to the _n_ last lap times (use a negative number to use the first _n_ times.)


##Usage Notes

1. `start()` and `stop()` can be called in multiple succession. _Call start anytime to reset the stopwatch.  Calling stop multiple times will return the duration from the last start to the current stop._
2. Alternatively, call `start()` once and then call `lap()` multiple times to record elapsed durations. Calling `stop()` still returns the time elapsed since the last `start()` call.
3. Another variation is calling `start()` and `stopLap()` in succession. This allows you to store multiple `start()` ... `stop()` durations to the lap store -- this is useful for explicitly recording non-contiguous lap durations.
4. Call `getAvgLapTime()` for an average of all lap times recorded.