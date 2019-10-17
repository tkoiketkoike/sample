// Sample Wab Application
// -----------------------------------------
// Server: Node.js + Express,js
// Client: Knockout.js

var express = require('express');
var svrmodel = require('./svrmodel.js');
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/scripts'));

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// WEBサーバー起動
var server = app.listen(80, function (){
	console.log('started Node&Express:' + server.address().port);
});
//var http = require('http');
//http.createServer(app).listen(80);
//console.log('started node & express...');


// Root Page表示
app.get('/', function() {
	// レンダリング
	res.render('./index.html');
});


// 以下、WebAPI群
app.get("/api/user/size", function(req, res, next){
    // 
    var cnt = svrmodel.count();
	console.log('get size = ' + cnt.size);
//	res.send('{"size":2}');
	res.send(cnt);
});

//var responseJson = '{ "results":[{"name":"yamada taro","age":44,"sex":"men","telnum":"000-000-0000","addrnum":"377-0000","addr":"Gunma Takasaki"},{"name":"suzuki jiro","age":24,"sex":"men","telnum":"000-020-0000","addrnum":"321-0000","addr":"Gunma Maebashi"}]}';
app.get("/api/user/all", function(req, res){
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

