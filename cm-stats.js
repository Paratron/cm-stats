/**
 * CanvasMark Stats
 * ================
 * This file provides the API to monitor results of CanvasMarks' tests.
 *
 * @author: Christian Engel <hello@wearekiss.com>
 * @version 1 (March 25th 2013)
 */
'use strict';

(function () {
    var stats;

    /**
     * This array contains the predefined test-keys of all available tests.
     * Add a new key here if you want to implement and record stats for a new test.
     * @type {Array}
     */
    var testKeys = [
        'cmark2013_1' //An example
    ];

    /**
     * Call this function before running any tests (for example when the CM suite has been loaded) to
     * get a new session object which enables you to track and save the test results.
     * @param {bool} autoSave Should the script auto-save after every finished test? Optional. Default = true
     * @returns {CmSession}
     */
    stats.startSession = function (autoSave) {
        return new CmSession(autoSave);
    };

    function CmSession(doAutoSave) {
        this.testResults = [];
        this.sessionID = Math.random().toString().split('.')[1];
        this.currentTest = null;
        this.autoSave = typeof doAutoSave !== undefined ? doAutoSave : true;
        this.specs = {
            cpu: null,
            gpu: null,
            ram: null,
            os: null,
            browser: null
        };
    }

    CmSession.prototype = {
        /**
         * Marks the beginning of a new test.
         * Time recording will be started automatically, so call this method immediately before running the next test.
         * @param testKey
         */
        startTest: function (testKey) {

            if (testKeys.indexOf(testKey) === -1) {
                throw new Error('Unknown testKey. Please use only predefined test keys.');
            }

            this.currentTest = {
                key: testKey,
                start: new Date()
            };
        },

        /**
         * Marks the end of a test.
         * Call this immediately after your test is finished, so the result can be stored.
         * @param {int} score The achieved score in this test.
         */
        finishTest: function (score) {
            var endTime = new Date();

            this.currentTest.duration = endTime.getTime() - this.currentTest.start.getTime();

            delete this.currentTest.start;

            this.currentTest.score = score;

            this.testResults.push(this.currentTest);

            this.currentTest = null;

            if(this.autoSave){
                this.save();
            }
        },

        /**
         * Sends all recorded results and the user specs (if available) to the server.
         */
        save: function () {

        },

        /**
         * Returns the total achieved score of all recorded tests.
         * @returns {number}
         */
        getTotalScore: function () {
            var totalScore = 0,
                    i = 0;

            for (; i < this.testResults.length; i++) {
                totalScore += this.testResults[i].score;
            }

            return totalScore;
        },

        /**
         * Returns the total amount of time taken by all finished tests.
         * Returns an object with the properties: hours, minutes, seconds, milliseconds.
         * @returns {object}
         */
        getTotalDuration: function () {
            var timeDummy = new Date(),
                    totalMilliseconds = 0,
                    i = 0;

            for (; i < this.testResults.length; i++) {
                totalMilliseconds += this.testResults[i].duration;
            }

            timeDummy.setTime(totalMilliseconds);

            return {
                hours: timeDummy.getHours(),
                minutes: timeDummy.getMinutes(),
                seconds: timeDummy.getSeconds(),
                milliseconds: timeDummy.getMilliseconds()
            };
        }
    };


    //Expose the Object to the global context.
    window.cmStats = stats;
})();