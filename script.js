const express = require("express");
const bodyparser = require("body-parser");
const session = require("express-session");

let app = express();
app.use(bodyparser.json());
app.set('view engine', 'ejs');

const publicDir = require('path').join(__dirname,'/public'); 
app.use(express.static(publicDir)); 

app.use('/', require('./routes/baseRoutes'));

app.all('*', (request, response) => {
    console.log("not found : "+request.url);
    response.render('error');    
});

const PORT = process.env.PORT || 4111;

let server = app.listen(PORT, function(){
    let host = server.address().address = '127.0.0.1';
    let port = server.address().port;
    console.log("Student System server is running at\t:\thttp://%s:%s", host, port);
});