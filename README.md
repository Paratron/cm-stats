CanvasMark Stats v1
======================

This project tries to bring detailed statistics into the CanvasMark 2013 HTML5 benchmark project by Kevin Roast.

It serves no other purpose but I opensourced it here because maybe somebody wants to grab it and tweak it for his purpose.


How to use cm-stats
-------------------

At the very first, you need to include the cm-stats.js file into the website:

    <script src="//social-rockstar/cm-stats/cm-stats.min.js">

***Heads up!*** This URL does currently not work since the backend scripts are not ready.

###Initializing a benchmark session
After the benchmark suite has been loaded, you can create a new benchmarking session like so:

    var benchmarkSession = cmStats.startSession();

This creates a new session object (which you have to keep!) that enables you to store test results.

By default, the `autoSave` feature is active, which causes cm-stats to send new results directly to the server
after each call of `finishTest()` on the session object.

If you don't want to do this, pass `false` as first argument into the session constructor.


###Doing benchmarks
Every benchmark test in CanvasMark has to get a unique identifier, so that you can tell cm-stats which test
has just been started, even if you add more tests to the suite at any time and/ore shuffle the order.

So you have to get the current tests key and call this method with it:

    benchmarkSession.startTest('myUniqueTestKey');

After this method has been called, cm-stats immediately starts to track how many time passes until the test is finished.
You leave your test running until its done and record the resulting score.

After the test is done, you call this method, passing the resulting score as an integer:

    benchmarkSession.finishTest(myScore);

If `autoSave` is active, the result of this test (duration and score) is immediately transfered to the server.
The unique test key is used to avoid data garbage and confusion on the serverside. =]

###Fetching final results
After all tests are done, you can request the final results from cm-stats.

To retrieve the total score of all tests, call:

    var totalScore = benchmarkSession.getTotalScore();

This returns an integer with the sum of all test scores.

If you want to know how much time the user spent in all tests, call:

    var totalDuration = benchmarkSession.getTotalDuration();

Which returns an object with the properties `hours`, `minutes`, `seconds`, and `milliseconds`.