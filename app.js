//declare modules.
var express = require("express");
var fs = require('fs');
var http = require('http');
var ffmpeg = require('fluent-ffmpeg');

var movie = process.argv[2];
var duration = process.argv[3];
var startTime = process.argv[4];

/*var proc = new ffmpeg({
  source: movie })
  .withSize(99%)
  .takeScreenshots({
    count: duration,
    timemarks: [startTime, duration]},
    'shots',
    function(err, filenames) {
      console.log('screenshots saved');
      console.log(filenames);
     });
*/

var proc = new ffmpeg({
  source: movie})
  .withSize('99%')
  .takeScreenshots(5, 'shots', function(err, filenames) {
    if (err) throw err;
  console.log(filenames);
  console.log('saved');
  } );
