// Server Side - Model

var fs = require('fs');

var dbfile = './USER';	// 保存ファイル
var MAX = 10;			// 最大保存数

//[
//	{"name":"","age":0,"sex":"","telnum":"","addrnum":"","addr":""},
//]

// W
exports.set = function(obj) {
//	var res = {"result":'NG'};
	var res = 'NG';
	
	if (obj.name == "")
		return res;
	
	try {
		var db = JSON.parse(fs.readFileSync(dbfile, 'utf8'));
	}
	catch(err) {
		console.log('1st set..');
		// はじめてのセット
		var db = [];
	}
	
	if ((0 < db.length) && (db.length < MAX)) {
		if (diff(obj.name, db) == true) {
			// 同名は登録しない
			return res;
		}
		
		db.push(obj);
		
		fs.writeFileSync(dbfile, JSON.stringify(db, null, ''));
		
//		res.result = 'OK';
		res = 'OK';
	}
	else {
//		console.log('1st set..');
		// はじめてのセット
//		var list = [];
		db.push(obj);
		fs.writeFileSync(dbfile, JSON.stringify(db, null, ''));
//		res.result = 'OK';
		res = 'OK';
	}
	
	return res;
};

// R
exports.get = function() {
	var obj = {"results":[]};
	
	try {
		var db = JSON.parse(fs.readFileSync(dbfile, 'utf8'));
		obj.results = db;
	}
	catch(err) {
		//
	}
	return obj;
};
exports.count = function() {
	var obj = {"size":0};
	
	try {
		var db = JSON.parse(fs.readFileSync(dbfile, 'utf8'));
		obj.size = db.length;
	}
	catch(err) {
		//
	}
	return obj;
};

// Delete
exports.delete = function(name) {
	console.log("welcome delete...");
	var res = {"result":'NG'}
	
	try {
		var db = JSON.parse(fs.readFileSync(dbfile, 'utf8'));
	}
	catch(err) {
		return res;
	}
	console.log('db.len='+db.length);
	
	if ((0 < db.length) && (db.length <= MAX)) {
		if (remove(name, db) == false) {
			return res;
		}
		
		fs.writeFileSync(dbfile, JSON.stringify(db, null, ''));
		
		res.result = 'OK';
	}
	
	return res;
};


// Local

// 同名データ居る？
// 居たらtrue
function diff(name, db)
{
	for (var i = 0; i < db.length; i++) {
		if(name === db[i].name) {
			console.log('diff true:' + name);
			return true;
		}
	}
	console.log('diff false:' + name);
	return false;
};

// 同名データを削除
// 削除でtrue
function remove(name, db)
{
	for (var i = 0; i < db.length; i++) {
		if(name === db[i].name) {
			console.log('remove true:' + name);
			db.splice(i, 1);
			return true;
		}
	}
	console.log('remove false:' + name);
	return false;
};
