//responsibility: handling user input

var express = require('express');
var app = express();
var processor = require('./processor');


app.use(express.bodyParser({keepExtensions: true, uploadDir: process.cwd() + '/movies'}));



app.get('/', function(request, response) {
  response.render('index.html');
});

app.post('/upload', function(request, response) {
  console.log(request.files.movie);
  movieToGif(request.files.movie.path, '1', '0');
  response.send(request.files.movie.path);
});

app.engine('html', require('hogan-express'));

app.listen(3000);
console.log('listening on 3000');

//define movie variables & argument vectors.

var movieToGif = function(movieFile, duration, startTime) {
  movieFile = movieFile || process.argv[2];
  duration = duration || process.argv[3];

  //startTime will be entered in seconds. In the future, implement way to translate traditionally formatted start time to seconds.
  startTime = startTime || process.argv[4];

  processor(movieFile, duration, startTime);
};
