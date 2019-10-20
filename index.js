// Sample Wab Application
// -----------------------------------------
// Server: Node.js + Express.js
// Client: Knockout.js

var express = require('express');
var svrmodel = require('./svrmodel.js');
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/scripts'));

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// *** WEBサーバー起動 ***
// process.envを使わないとHerokuでApplication Errorになる
var server = app.listen(process.env.PORT || 80, function (){
	console.log('started Node&Express:' + server.address().port);
});

// Root Page表示
app.get('/', function() {
	// レンダリング
	res.render('./index.html');
});


// *** 以下、WebAPI群 ***
// 登録件数の取得
app.get("/api/user/size", function(req, res){
    var resdata = {};
    resdata.size = svrmodel.count();
    
	res.send(resdata);
});
// 全件取得
app.get("/api/user/all", function(req, res){
	var resdata = {};
	resdata.results = svrmodel.get();
	
	res.send(resdata);
});
// 1件設定
app.post("/api/user/", function(req, res){
	console.log('create: ' + req.body.name);
	
	var resdata = {};
	resdata.result = svrmodel.set(req.body);
	res.send(resdata);
});
// 1件修正
app.put("/api/user/:name", function(req, res){
	console.log('update: ' + req.params.name);
	console.log("body.name: "+req.body.name);
	
	var resdata = {};
	resdata.result = svrmodel.update(req.params.name, req.body);
	
	res.send(resdata);
});
// 指定情報の削除
app.delete("/api/user/:name", function(req, res){
    console.log('delete: ' + req.params.name);
	
	var resdata = {};
	resdata.result = svrmodel.delete(req.params.name);
	
	res.send(resdata);
});

