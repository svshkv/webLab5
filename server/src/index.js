const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const config = require('./config/config');
const mongodb = require("mongodb")
const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });


app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/posts132123', (req, res) => {
  res.send(
    [{
      title: "Hello World!",
      description: "Hi there! How are you?"
    }]
  )
});



// app.listen(8081, function () {
// 	console.log(`Server start on port ${config.port} ...`);
// });

let dbClient;
 
app.use(express.static(__dirname + "/public"));
 
mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    dbClient = client;
    const db = client.db("postsdb");
    const collection = db.collection("posts");
    // let user = {name: "Tom", age: 23};
    // collection.insertOne(user, function(err, result) {
    // 	if(err){ 
    //         return console.log(err);
    //     }
    app.locals.collection = client.db("postsdb").collection("posts");
    	app.listen(8081, function(){
        console.log("Сервер ожидает подключения...");

    	});
    //});
});

app.get("/posts", function(req, res){
        
    const collection = req.app.locals.collection;
    collection.find({}).toArray(function(err, users){
         
        if(err) return console.log(err);
        res.send(users)
    });
     
});

app.get('/newpost', function(req, res) {
    console.log(req.body); // the posted data
    console.log(res.body);

});

app.post('/newpost', function(req, res) {
    console.log(req.body); // the posted data
    var text = req.body.text
    var date = req.body.date
    const collection = req.app.locals.collection;
    collection.insertOne(req.body, function(err, result) {
	    if(err){ 
	        return console.log(err);
	    }
	});
});

app.get('/deletepost', function(req, res) {
    console.log(req.body); // the posted data
    console.log(res.body);

});

app.post('/deletepost', function(req, res) {
    console.log(req.body.id); // the posted data
    const collection = req.app.locals.collection;
    collection.remove({_id: new mongodb.ObjectID( req.body.id )}, function(err, result) {
	    if(err){ 
	        return console.log(err);
	    } else {
	    	return console.log(result);
	    }
	});
});
