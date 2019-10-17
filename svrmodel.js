// Server Side - Model

var fs = require('fs');

var dbfile = './USER';	// �ۑ��t�@�C��
var MAX = 10;			// �ő�ۑ���

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
		// �͂��߂ẴZ�b�g
		var db = [];
	}
	
	if ((0 < db.length) && (db.length < MAX)) {
		if (diff(obj.name, db) == true) {
			// �����͓o�^���Ȃ�
			return res;
		}
		
		db.push(obj);
		
		fs.writeFileSync(dbfile, JSON.stringify(db, null, ''));
		
//		res.result = 'OK';
		res = 'OK';
	}
	else {
//		console.log('1st set..');
		// �͂��߂ẴZ�b�g
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

// �����f�[�^����H
// ������true
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

// �����f�[�^���폜
// �폜��true
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
