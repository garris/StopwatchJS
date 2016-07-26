#Stopwatch.js

This is a stopwatch on steroids. It works like a conventional stopwatch but it can also keep a log of start-stop time durations to quickly calculate things like periodic averages and standard deviation values.
 
IOW: This is useful if you have a JS event handler that you want to profile over time. 


##Install

```
<script defer src="lib/stopwatch.js"></script>
```

##API

### The classic stuff

Make a new stopwatch like so...
`var sw = new Stopwatch(label, resolution, autoStart);`
- `label` Defaults to 'stopwatch'
- `resolution` Integer sets sub-milisecond rounding e.g. 1 = 0.0, 2 = 0.00, 3 = 0.000
- `autoStart` Defaults to true. if set to false will not autoStart when initialized

`sw.start();` 
Sets/resets stopwatch.

`sw.stop(toConsole);` 
Stops the stopwatch and returns duration in ms.  Setting `toConsole` = `true` logs stop time to console.

`sw.lap(lapLabel, toConsole, [selfTime])`
Lap pushes a lap object into an internal array `sw.laps`.  Lap objects include these properties: `label` the name of the lap if provided, `time` the running time value, `self` the time since the last lap was called **or** _if using stopLap()_ the duration of the current start-stop period.
- lapLabel defaults to 'lap'
- Setting `toConsole` to `true` logs lap time to console.
- Optionally include `selfTime` to record arbitrary lap durations.

### The advanced stuff

`sw.stopLap(toConsole);` 
Call this after calling `sw.start()`. This works just like `sw.stop()` but pushes the start-stop duration you just captured into the lap array.  Call `sw.start()` - `sw.stopLap()` every time you want to capture a process duration. This is useful for profiling event handlers. Just remember to always call `start()` each time before calling `stopLap()` or your results will be wacked.


`sw.getLaps(filterBy)`
Returns the lap object buffer. Filter by `"running"` for the running times or by `"self"` for just self times.



`sw.getLapMean(toConsole [, tail])`
Returns average of all lap durations.
- Setting `toConsole` = `true` logs average lap time to console.
- Including a `tail` value (integer) will limit the average to the _n_ last lap times (use a negative number to use the first _n_ times.) 


`sw.getLapStdDev(toConsole [, tail])`
Returns the Standard Deviation for all lap durations.
- Setting `toConsole` = `true` logs standard deviation to console.
- Including a `tail` value (integer) will limit the analysis to the _n_ last lap times (use a negative number to use the first _n_ times.)


`sw.isRunning();`
Returns true if start has been called and stop has not yet been called.


##Usage Notes

1. `start()` and `stop()` can be called in multiple succession. _Call start anytime to reset the stopwatch.  Calling stop multiple times will return the duration from the last start to the current stop._
2. Alternatively, call `start()` once and then call `lap()` multiple times to record elapsed running time and duration since last lap. Calling `stop()` returns the time elapsed since the last `start()` call. This is useful for profiling loop processes.
3. Another variation is calling `start()` and `stopLap()` in sequence. This allows you to store multiple `start()` ... `stop()` durations to the lap store. This is useful for profiling event handlers.
4. Use `sw.getLaps()`, `sw.getLapMean()`, `sw.getLapStdDev()` methods for quick analysis after collecting data with #2 & #3 above.