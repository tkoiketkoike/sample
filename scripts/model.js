// Knockout.js - Model
const baseURL = location.href + 'api';

class model 
{
	constructor() {}
	
	// AJAX
	_request(method, dest, body) {
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
			async: false,	// false 同期
		}).done(function (result, type) { 
			console.info('HTTP RESPONSE: '+type);
			response = result;
		}).fail(function (xhr, status, errThrown) {
			console.warn('HTTP ERROR: '+status+', '+errThrown);
		});
		
		return response;
	}
	
	// CRUD
	//  - GET:		get
	//  - PUT:		set
	//  - POST:		create
	//  - DELETE:	delete
	
	// 1レコード作成
	setRecord(record) {
		return this._request('POST', baseURL + '/user', JSON.stringify(record));
	}
	// 総数の取得
	getSize() {
		return this._request('GET', baseURL + '/user/size', null);
	}
	// 全レコード取得
	getAll() {
		return this._request('GET', baseURL + '/user/all', null);
	}
	// 1レコード修正
	updateRecord(name, record) {
		return this._request('PUT', baseURL + '/user/' + name, JSON.stringify(record));
	}
	// 1レコード削除
	deleteRecord(name) {
		return this._request('DELETE', baseURL + '/user/' + name, null);
	}
}
