// Server Side - Model

var fs = require('fs');

var dbfile = './USER';	// 保存ファイル
var MAX = 10;			// 最大保存数

// Create
exports.set = function(obj) {
	var res = 'NG';
	
	if (obj.name == "")
		return res;
	
	try {
		var db = JSON.parse(fs.readFileSync(dbfile, 'utf8'));
	}
	catch(err) {
		// 空
		var db = [];
	}
	
	if (0 < db.length) {
		if ((MAX <= db.length) || (diff(obj.name, db) >= 0)) {
			// 同名は登録しない
			return res;
		}
	}
	db.push(obj);
	fs.writeFileSync(dbfile, JSON.stringify(db, null, ''));
	res = 'OK';
	
	return res;
};

// Get
exports.get = function() {
	var list = [];
	
	try {
		var db = JSON.parse(fs.readFileSync(dbfile, 'utf8'));
		list = db;
	}
	catch(err) {
		//
	}
	return list;
};
exports.count = function() {
	var cnt = 0;
	
	try {
		var db = JSON.parse(fs.readFileSync(dbfile, 'utf8'));
		cnt = db.length;
	}
	catch(err) {
		//
	}
	return cnt;
};

// Update
exports.update = function(name, obj) {
	var res = 'NG';
	console.log(obj[0]);
	if (name == "")
		return res;
	
	try {
		var db = JSON.parse(fs.readFileSync(dbfile, 'utf8'));
	}
	catch(err) {
		return res;
	}
	
	if ((0 < db.length) && (db.length < MAX)) {
		var index = diff(name, db);
		if (index >= 0) {
			// 当該レコードの名前以外を書き換え
			var list =[];
			var nameObj = {"name":name};
			list.push(nameObj);
			for (var i=0; i < 5; i++)
				list.push(obj[i]);
//			list.splice(0, 0, name, obj.age, obj.sex, obj.telnum, obj.addrnum, obj.addr);
//			list.splice(0, 6, {"name":name}, obj[0], obj[1], obj[2], obj[3], obj[4]);
			db[index] = list;
			console.log('list:'+list);
			fs.writeFileSync(dbfile, JSON.stringify(db, null, ''));
			res = 'OK';
		}
	}
	
	return res;
};

// Delete
exports.delete = function(name) {
	var res = 'NG';
	
	try {
		var db = JSON.parse(fs.readFileSync(dbfile, 'utf8'));
	}
	catch(err) {
		return res;
	}
//	console.log('db.len='+db.length);
	
	if ((0 < db.length) && (db.length <= MAX)) {
		if (remove(name, db) == false) {
			return res;
		}
		
		fs.writeFileSync(dbfile, JSON.stringify(db, null, ''));
		
		res = 'OK';
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
//			console.log('diff true:' + name + ' :' + i);
			return i;
		}
	}
//	console.log('diff false:' + name);
	return (-1);
};

// 同名データを削除
// 削除でtrue
function remove(name, db)
{
	for (var i = 0; i < db.length; i++) {
		if(name === db[i].name) {
//			console.log('remove true:' + name);
			db.splice(i, 1);
			return true;
		}
	}
//	console.log('remove false:' + name);
	return false;
};
