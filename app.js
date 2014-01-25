//responsibility: handling user input

var express = require('express');
var app = express();
var processor = require('./processor');

//define movie variables & argument vectors.

var movieToGif = function(movieFile, duration, startTime, callback) {
  // takes argvs as well
  movieFile = movieFile || process.argv[2];
  duration = duration || process.argv[3];

  //startTime will be entered in seconds. In the future, implement way to translate traditionally formatted start time to seconds.
  startTime = startTime || process.argv[4];

  processor(movieFile, duration, startTime, callback);
};


//bodyparser. upload movie file to `./movies`.
//size limit set to 200 MB.
app.use(express.bodyParser({keepExtensions: true,
                           uploadDir: process.cwd() + '/movies',
                           limit: '200mb'}));



// define views directory
app.use('/views', express.static(__dirname + '/views'));

//define `./gif` directory.
app.use('/gif', express.static(__dirname + '/gif'));

//render `index.html` as root route.
app.get('/', function(request, response) {
  response.render('index.html');
});

//define `/upload` as post route.
app.post('/upload', function(request, response) {
  movieToGif(request.files.movie.path, '1', '0', function(filename){
    //in the future this should grab the port number from the server instance
    response.render('upload.html', {
      url: 'http://' + request.host + ':3000' + '/' + filename,
      size: 0});
  });
});

app.engine('html', require('hogan-express'));

app.listen(3000);
console.log('listening on 3000');

