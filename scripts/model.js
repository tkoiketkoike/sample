// Knockout.js - Model

var baseHOST = 'localhost';		// Heroku�T�[�o�[�ɕς���
var baseURL = 'http://' + baseHOST +'/api';

var model = Object.create({}, {
	// AJAX
	_request: {
		value: function(method, dest, body){
			console.log("HTTP REQ: "+method+" "+dest);
			
			$.ajaxSetup({
			  xhr: function() {
				  return new XMLHttpRequest();
			  }
			});
			
			var response = "";
			$.ajax({ 
				url: dest, 
				type: method, 
				contentType: 'application/json; charset=utf-8',
				dataType: 'json',
				data: body,		// ���M�f�[�^
		    	cache: false, 	// �L���b�V�������Ȃ�
				async: false,	// true �񓯊��Afalse ����
			}).done(function (result, type) { 
				console.info('HTTP RESPONSE: '+type);
				response = result;
			}).fail(function (xhr, status, errThrown) {
				console.warn('HTTP ERROR: '+status+', '+errThrown);
			});
			
			return response;
		}
	},
	
	// CRUD
	//  - GET:		get
	//  - PUT:		set
	//  - POST:		create
	//  - DELETE:	delete
	
	// �����̎擾
	getSize: {
		value: function(){
			return this._request('GET', baseURL + '/user/size', null);
		}
	},
	// 1���R�[�h�쐬
	setRecord: {
		value: function(record){
			return this._request('POST', baseURL + '/user', JSON.stringify(record));
		}
	},
	// 1���R�[�h�擾
	getRecord: {
		value: function(index){
			return this._request('GET', baseURL + '/user/' + index, null);
		}
	},
	// �S���R�[�h�擾
	getAll: {
		value: function(){
			return this._request('GET', baseURL + '/user/all', null);
		}
	},
	// 1���R�[�h�C��
//	createRecord: {
//		value: function(record){
//			return this._request('POST', baseURL + '/user', record);
//		}
//	},
	// 1���R�[�h�폜
	deleteRecord: {
		value: function(name){
//			return this._request('DELETE', baseURL + '/user', JSON.stringify(name));
			return this._request('DELETE', baseURL + '/user/' + name, null);
		}
	}
});
