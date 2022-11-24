const express = require("express");
const bodyparser = require("body-parser");
/* const session = require("express-session"); */
const publicDir = require('path').join(__dirname,'/public'); 

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(publicDir)); 
app.use('/', require('./routes/routes'));

app.all('*', (request, response) => {
    console.log("not found : "+request.url);
});

const PORT = process.env.PORT || 4111;

let server = app.listen(PORT, function(){
    let host = server.address().address = '127.0.0.1';
    let port = server.address().port;
    console.log("Student System server is running at\t:\thttp://%s:%s", host, port);
});