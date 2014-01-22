//responsibility: processing files into gifs

//define modules.
var fs = require('fs');
var ffmpeg = require('fluent-ffmpeg');
var imagemagick = require('imagemagick');

var frameTimes = [];

//frame rate is hardcoded right now to 24 fps. In the future, framerate will be derived from ffmpeg metadata.
var FRAMERATE = 24;


module.exports = function(movieFile, duration, startTime, callback) {

  var numFrames = duration * FRAMERATE;
  var newTime = parseFloat(startTime);

  for (var i = 0; i < numFrames; i = i + 1) {
    newTime = newTime + (1/FRAMERATE);

    frameTimes[i] = newTime.toString();
  }

  new ffmpeg({
    source: movieFile
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
      var gifFileName = 'gif/' + movieFile.match(/.([^/]*)[.$]/)[1] + '.gif';
      imagemagick.convert(['-delay', '5', '-loop', '0', 'shots/*.jpg', gifFileName],
        function(err, data){
          if (err) throw err;
          console.log(data);
          console.log('gif saved');
          callback(gifFileName);
          fs.readdir('./shots/', function(err, filenames) {
                    if (err) throw err;
                    console.log(filenames);
                    var shotsContents = filenames.length;
                    for (var i=0; i < shotsContents; i= i+1) {
                      fs.unlink('./shots/' + filenames[i], function(err) {
                               if (err) throw err;
                      });
                    }
          });
        }
      );
    });

};
