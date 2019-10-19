// Server Side - Model

var fs = require('fs');

var dbfile = './USER';	// �ۑ��t�@�C��
var MAX = 10;			// �ő�ۑ���

// Create
exports.set = function(obj) {
	var res = 'NG';
	
	if (obj.name == "")
		return res;
	
	try {
		var db = JSON.parse(fs.readFileSync(dbfile, 'utf8'));
	}
	catch(err) {
		// ��
		var db = [];
	}
	
	if (0 < db.length) {
		if ((MAX <= db.length) || (diff(obj.name, db) >= 0)) {
			// �����͓o�^���Ȃ�
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
	if (name == "")
		return res;
	
	try {
		var db = JSON.parse(fs.readFileSync(dbfile, 'utf8'));
	}
	catch(err) {
		return res;
	}
	
	var index = diff(name, db);
	if (index >= 0) {
		// ���Y���R�[�h�̖��O�ȊO����������
		obj.name = name;
		db[index] = obj;
		fs.writeFileSync(dbfile, JSON.stringify(db, null, ''));
		res = 'OK';
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

// �����f�[�^����H
// ������true
function diff(name, db)
{
	for (var i = 0; i < db.length; i++) {
		if(name === db[i].name) {
			return i;
		}
	}
//	console.log('diff false:' + name);
	return (-1);
};

// �����f�[�^���폜
// �폜��true
function remove(name, db)
{
	for (var i = 0; i < db.length; i++) {
		if(name === db[i].name) {
			db.splice(i, 1);
			return true;
		}
	}
//	console.log('remove false:' + name);
	return false;
};
