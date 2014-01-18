//define modules.
var express = require("express");
var fs = require('fs');
var http = require('http');
var ffmpeg = require('fluent-ffmpeg');
var imagemagick = require('imagemagick');

//define movie variables & argument vectors.
var movie = process.argv[2];
var duration = process.argv[3];

//frame rate is hardcoded right now to 24 fps. In the future, framerate will be derived from ffmpeg metadata.
var FRAMERATE = 24;
var numFrames = duration * FRAMERATE;
//startTime will be entered in seconds. In the future, implement way to translate traditionally formatted start time to seconds.
var startTime = process.argv[4];
var frameTimes = [];

var newTime = parseFloat(startTime);

for (var i = 0; i < numFrames; i = i + 1) {
  newTime = newTime + (1/FRAMERATE);

  frameTimes[i] = newTime.toString();
}

var ffmpegInstance = new ffmpeg({
  source: movie
}).withSize('99%')
  .onProgress(function(progress) {
    console.log(progress.percent + '%');
  })
  .takeScreenshots({
    count: numFrames,
    timemarks: frameTimes,
    filename: '%b_shot_%000i'
  }, 'shots', function(err, filenames) {
    if (err) throw err;
    console.log('screenshots saved');
    console.log(filenames);


    //imagemagick function. Second argv should be variable, will be between 3 and 7, will translate to fast medium slow.
    imagemagick.convert(['-delay', '5', '-loop', '0', 'shots/*.jpg', 'gif.gif'],
      function(err, data){
        if (err) throw err;
        console.log(data);
      }
    );
  });

