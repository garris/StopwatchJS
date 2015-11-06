#Stopwatch.js

Quickly through some stopwatch instances around your JS app. Nice for spot profiling.


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

`sw.stop(toConsole, pushLap);` 
Stops the stopwatch and returns duration in ms.  Setting toConsole true logs stop time to console. 

`sw.isRunning();`
Returns true if running.

`sw.lap(lapLabel, toConsole, [selfTime])`
Lap pushes a lap object into an internal array `sw.laps`.
lapLabel defaults to 'lap'
Setting toConsole true logs lap time to console.
Optionally include `selfTime` to record arbitrary lap durations.

`sw.getAvgLapTime(toConsole, slice)`
Returns average of all lap times.
Setting toConsole true logs average lap time to console.
Slice defaults to 10. Averages up to the n last lap times.


##Usage Notes

1. `start()` and `stop()` can be continually called in succession to time duration of events. 
2. Alternatively, call `start()` once and then call `lap()` multiple times to record contiguous duration measurements, optionally call `stop()` for the sum of durations.
3. Another variation is calling `start()` and `stop(true)` in continual succession. This method pushes each stopTime to the laps array -- this is useful for when explicitly recording not contiguous lap durations.