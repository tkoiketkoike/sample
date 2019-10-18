// Knockout.js - ViewModel

// ------------------------
// ViewModel
var ViewModel = {
	
	model: Object.create(model),
	
	// Properties
	name: ko.observable(''),		// ���O
	age: ko.observable(''),			// �N��
//    ageValues : [,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40],
	sex: ko.observable(''),			// ����
    sexValues : ["","MAN", "WOMAN"],
	telnum: ko.observable(''),		// �d�b�ԍ�
	addrnum: ko.observable(''),		// �X�֔ԍ�
	addr: ko.observable(''),		// 
	
	now: ko.observable(0),			// �o�^��
	max: ko.observable(10),			// �ő�o�^��
	items: ko.observableArray([]),	// �\���A�C�e��
	
	// Methods
	init: function() {
		console.info("loaded vm...");
		// �������Z�b�g
		var obj = this.model.getSize();
		this.now(obj.size);
		console.info("record size = " + this.now());
		
		// �A�C�e���擾
		this.getAll();
	},
	
	// 1���쐬
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
	
	// 1���폜
	deleteButton: function() {
		// ���O���L�[�Ƃ��ĕ\�����f�[�^���폜
		this.model.deleteRecord(this.name());
		
		// reset
		this.init();
	},
	
	// �C��
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
	
	// �\������
	selectRecord: function(item) {
		// �I�����ꂽ�A�C�e����\��
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
// ������
ViewModel.init();

// knockout�t���[�����[�N�Ƀo�C���f�B���O
window.onload = function() {
	ko.applyBindings(ViewModel);
}
