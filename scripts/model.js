// Knockout.js - Model

var baseHOST = 'localhost';		// Herokuサーバーに変える
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
				data: body,		// 送信データ
		    	cache: false, 	// キャッシュさせない
				async: false,	// true 非同期、false 同期
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
	
	// 総数の取得
	getSize: {
		value: function(){
			return this._request('GET', baseURL + '/user/size', null);
		}
	},
	// 1レコード作成
	setRecord: {
		value: function(record){
			return this._request('POST', baseURL + '/user', JSON.stringify(record));
		}
	},
	// 1レコード取得
	getRecord: {
		value: function(index){
			return this._request('GET', baseURL + '/user/' + index, null);
		}
	},
	// 全レコード取得
	getAll: {
		value: function(){
			return this._request('GET', baseURL + '/user/all', null);
		}
	},
	// 1レコード修正
//	createRecord: {
//		value: function(record){
//			return this._request('POST', baseURL + '/user', record);
//		}
//	},
	// 1レコード削除
	deleteRecord: {
		value: function(name){
//			return this._request('DELETE', baseURL + '/user', JSON.stringify(name));
			return this._request('DELETE', baseURL + '/user/' + name, null);
		}
	}
});
