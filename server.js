var express = require("express");
 var expresshandlebars = require("express-handlebars") 
var logger = require("morgan");
var mongoose = require("mongoose");
 

//axios is the http library just like jquery ajax it can work with both client and server

 
 
const PORT = process.env.PORT || 3000;

var app = express();

app.use(logger("dev"));

app.engine("handlebars", expresshandlebars({defaultLayout:"main"}))
app.set("view engine","handlebars")

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static("public"));
;
var apiroutes= require("./routes/apiroutes");
apiroutes(app)



 mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/allNewsScrape")    ;

//connect to moongoose db

app.listen(PORT, function(){
    console.log("app is listening on http://localhost:" + PORT);
})
