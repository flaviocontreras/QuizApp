var express = require('express');
var path = require('path');

// Create our app
var app = express();
// Busca a porta do Heroku
const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.join(__dirname, '../public');


app.use(express.static(PUBLIC_PATH));

// Makes sure to send the bundle.js even when the with multiple routes
app.get('*/bundle.js', function (request, response){
  response.sendFile(path.resolve(PUBLIC_PATH, 'bundle.js'))
});
// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
// Usar somente com browserHistory, desabilitar no caso de hashHistory
app.get('*', function (request, response){
  response.sendFile(path.resolve(PUBLIC_PATH, 'index.html'))
});

app.listen(PORT, function(){
    console.log('Express server is up on port ' + PORT);
});
