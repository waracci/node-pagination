var express = require('express')
var ejs = require('ejs')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var app = express();
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds129926.mlab.com:29926/article')

//body parser ids the middleware for parsing incoming request bodies 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var mainRoutes = require('./routes/main');
app.use(mainRoutes);
app.set('view engine', 'ejs');
app.listen(8080, function(){
    console.log("App working on 8080")
})