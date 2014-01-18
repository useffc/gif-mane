//define modules.
var express = require("express");
var fs = require('fs');
var http = require('http');
var ffmpeg = require('fluent-ffmpeg');

//define movie variables & argument vectors.
var movie = process.argv[2];
var duration = process.argv[3];

//frame rate is hardcoded right now to 24 fps. In the future, framerate will be derived from ffmpeg metadata.
var numFrames = duration * 24;
//startTime will be entered in seconds. In the future, implement way to translate traditionally formatted start time to seconds.
var startTime = process.argv[4];
var frameTimes = [];

var newTime = startTime;

/*for (var i = 0; i < numFrames; i = i + 1) {
  newTime = newTime + 0.416;
}*/


for (var i = 0; i < numFrames; i = i + 1) {
  frameTimes[i] = newTime;
}


var ffmpegInstance = new ffmpeg({
  source: movie
}).withSize('99%')
  .takeScreenshots({
    count: numFrames,
    timemarks: frameTimes,
    filename: '%b_shot_%000i'
  }, 'shots', function(err, filenames) {
    if (err) throw err;
    console.log('screenshots saved');
    console.log(filenames);
  });
