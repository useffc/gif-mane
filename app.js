//responsibility: handling user input

var express = ('express');
var processor = require('./processor');


//define movie variables & argument vectors.
var movieFile = process.argv[2];
var duration = process.argv[3];

//startTime will be entered in seconds. In the future, implement way to translate traditionally formatted start time to seconds.
var startTime = process.argv[4];

processor(movieFile, duration, startTime);
