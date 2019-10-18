// Knockout.js - ViewModel

// ------------------------
// ViewModel
var ViewModel = {
	
	model: Object.create(model),
	
	// Properties
	name: ko.observable(''),		// 名前
	age: ko.observable(''),			// 年齢
//    ageValues : [,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40],
	sex: ko.observable(''),			// 性別
    sexValues : ["","MAN", "WOMAN"],
	telnum: ko.observable(''),		// 電話番号
	addrnum: ko.observable(''),		// 郵便番号
	addr: ko.observable(''),		// 
	
	now: ko.observable(0),			// 登録数
	max: ko.observable(10),			// 最大登録数
	items: ko.observableArray([]),	// 表示アイテム
	
	// Methods
	init: function() {
		console.info("loaded vm...");
		// 件数リセット
		var obj = this.model.getSize();
		this.now(obj.size);
		console.info("record size = " + this.now());
		
		// アイテム取得
		this.getAll();
	},
	
	// 1件作成
	createButton: function() {
		var req = {};
		if (this.name() === "") {
			console.warn("must");
			return;
		}
		req.name = this.name();
		req.age = this.age();
		req.sex = this.sex();
		req.telnum = this.telnum();
		req.addrnum = this.addrnum();
		req.addr = this.addr();
		
		var res = this.model.setRecord(req);
		if (res.result === "OK"){
			this.clear();
		}
		else {
			console.warn("create fail..");
			return;
		};
		
		//reset
		this.init();
	},
	
	// 1件削除
	deleteButton: function() {
		// 名前をキーとして表示中データを削除
		this.model.deleteRecord(this.name());
		
		// reset
		this.init();
	},
	
	// 修正
	updateButton: function() {
		// Check
		if (this.name === ""){
			console.warn("must");
			return;
		}
		
		var obj = {};
		obj.age = this.age();
		obj.sex = this.sex();
		obj.telnum = this.telnum();
		obj.addrnum = this.addrnum();
		obj.addr = this.addr();
		
		var res = this.model.updateRecord(this.name(), obj);
		if (res.result === "OK"){
			this.clear();
		}
		else {
			console.warn("update fail..");
			return;
		};
		
		//reset
		this.init();
	},
	
//	get: function() {
//		var obj = this.model.getRecord();
//		if (obj !== NULL){
//			this.name(obj.name);
//			this.age(obj.age);
//			this.sex(obj.sex);
//			this.telnum(obj.telnum);
//			this.addrnum(obj.addrnum);
//			this.addr(obj.addr);
//		}
//		return obj;
//	},
	
	getAll: function() {
		this.items.removeAll();
		var obj = this.model.getAll();
		console.info("getAll() = " + obj.results.length);
		for (var i = 0; i < obj.results.length; i++) {
			this.items.push(obj.results[i]);
		}
	},
	
	// 表示制御
	selectRecord: function(item) {
		// 選択されたアイテムを表示
		ViewModel.name(item.name);
		ViewModel.age(item.age);
		ViewModel.sex(item.sex);
		ViewModel.telnum(item.telnum);
		ViewModel.addrnum(item.addrnum);
		ViewModel.addr(item.addr);
	},
	clear: function() {
		this.name('');
		this.age('');
		this.sex('');
		this.telnum('');
		this.addrnum('');
		this.addr('');
	}
};

// ------------------------
// Computed

ViewModel.isRecordMax = ko.computed(function() {
	return ViewModel.now() >= ViewModel.max;
});

ViewModel.isRecordEmpty = ko.computed(function() {
	return ViewModel.now() <= 0;
});

// ------------------------
// 初期化
ViewModel.init();

// knockoutフレームワークにバインディング
window.onload = function() {
	ko.applyBindings(ViewModel);
}
