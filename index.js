// Node + Express

var express = require('express');
var app = express();
var http = require('http');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/scripts'));


var bodyParser = require('body-parser')
//app.use(express.bodyParser());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



//var server = app.listen(80, function (){
//	console.log('started express...' + server.address().port);
//});
http.createServer(app).listen(80);
console.log('started node & express...' + http.port);

var svrmodel = require('./svrmodel.js');


//app.set('view engine', 'html');

// lib
//app.get("/viewModel.js", function(req, res, next){
//	var stream = fs.createReadStream('./scripts/viewModel.js');
//	res.writeHead(200, {'Content-Type': 'text/plain'});
//	stream.pipe(res);
//});
//app.get("/model.js", function(req, res, next){
//	var stream = fs.createReadStream('./scripts/model.js');
//	res.writeHead(200, {'Content-Type': 'text/plain'});
//	stream.pipe(res);
//});

// Root Page•\Ž¦
app.get('/', function(req, res) {
	// ƒŒƒ“ƒ_ƒŠƒ“ƒO
	res.render('./index.html');
});

//function notFound(res) {
//	res.statusCode = 404;
//	res.end('Not Found');
//}


// WebAPI
app.get("/api/user/size", function(req, res, next){
    // 
    var cnt = svrmodel.count();
	console.log('get size = ' + cnt.size);
//	res.send('{"size":2}');
	res.send(cnt);
});

//var responseJson = '{ "results":[{"name":"yamada taro","age":44,"sex":"men","telnum":"000-000-0000","addrnum":"377-0000","addr":"Gunma Takasaki"},{"name":"suzuki jiro","age":24,"sex":"men","telnum":"000-020-0000","addrnum":"321-0000","addr":"Gunma Maebashi"}]}';
app.get("/api/user/all", function(req, res, next){
    // 
//    console.log('index = ALL');
//	res.send(responseJson);
	
	res.send(svrmodel.get());
});

app.get("/api/user/:index", function(req, res, next){
    // 
    console.log('index = ' + req.params.index);
	res.send('{"name":"yamada taro","age":44,"sex":"men","telnum":"000-000-0000","addrnum":"377-0000","addr":"Gunma Takasaki"}');
});


app.post("/api/user/", function(req, res, next){
    // 
    console.log('req='+req);
    
//    var body = JSON.parse(req.body);
//    console.log('body='+body);
    console.log('body='+req.body);
    
    console.log('name = ' + req.body.name);
    console.log('age = ' + req.body.age);
    console.log('sex = ' + req.body.sex);
    console.log('telnum = ' + req.body.telnum);
    console.log('addrnum = ' + req.body.addrnum);
    console.log('addr = ' + req.body.addr);
//	res.send('{"name"="yamada taro"}');
//	res.send('{"result":"OK"}');
	
	var result = svrmodel.set(req.body);
	res.send(result);
});

app.delete("/api/user/:name", function(req, res, next){
    console.log('delete = ' + req.params.name);
	
//	res.send('{"result":"OK"}');
	
	var result = svrmodel.delete(req.params.name);
	res.send(result);
});

