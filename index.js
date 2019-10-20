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

// *** WEB�T�[�o�[�N�� ***
// process.env���g��Ȃ���Heroku��Application Error�ɂȂ�
var server = app.listen(process.env.PORT || 80, function (){
	console.log('started Node&Express:' + server.address().port);
});

// Root Page�\��
app.get('/', function() {
	// �����_�����O
	res.render('./index.html');
});


// *** �ȉ��AWebAPI�Q ***
// �o�^�����̎擾
app.get("/api/user/size", function(req, res){
    var resdata = {};
    resdata.size = svrmodel.count();
    
	res.send(resdata);
});
// �S���擾
app.get("/api/user/all", function(req, res){
	var resdata = {};
	resdata.results = svrmodel.get();
	
	res.send(resdata);
});
// 1���ݒ�
app.post("/api/user/", function(req, res){
	console.log('create: ' + req.body.name);
	
	var resdata = {};
	resdata.result = svrmodel.set(req.body);
	res.send(resdata);
});
// 1���C��
app.put("/api/user/:name", function(req, res){
	console.log('update: ' + req.params.name);
	console.log("body.name: "+req.body.name);
	
	var resdata = {};
	resdata.result = svrmodel.update(req.params.name, req.body);
	
	res.send(resdata);
});
// �w����̍폜
app.delete("/api/user/:name", function(req, res){
    console.log('delete: ' + req.params.name);
	
	var resdata = {};
	resdata.result = svrmodel.delete(req.params.name);
	
	res.send(resdata);
});

