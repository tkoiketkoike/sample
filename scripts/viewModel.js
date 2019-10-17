// Knockout.js - ViewModel

// ------------------------
// ViewModel
var ViewModel = {
	
	model: Object.create(model),
//	view: Object.create(view),
	
	// Properties
	name: ko.observable(''),		// ���O
	age: ko.observable(''),			// �N��
	sex: ko.observable(''),			// ����
	telnum: ko.observable(''),		// �d�b�ԍ�
	addrnum: ko.observable(''),		// �X�֔ԍ�
	addr: ko.observable(''),		// 
	
	now: ko.observable(0),			// �o�^��
	max: ko.observable('10'),		// �ő�o�^��
	
	items: ko.observableArray([]),	// �\���A�C�e��
	
	
	msg: ko.observable('---'),		// log
	
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
		req.name = this.name();
		req.age = this.age();
		req.sex = this.sex();
		req.telnum = this.telnum();
		req.addrnum = this.addrnum();
		req.addr = this.addr();
		
		var res = this.model.setRecord(req);
		if (res.result !== "OK"){
			msg("create fail..");
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
//	update: function() {
//		// Check
//		if (get(this.name) !== NULL){
//			msg("name is exist..");
//			return;
//		}
//		
//		var obj = {};
//		obj.name = this.name();
//		obj.age = this.age();
//		obj.sex = this.sex();
//		obj.telnum = this.telnum();
//		obj.addrnum = this.addrnum();
//		obj.addr = this.addr();
//		this.model.setRecord(obj);
//	},
	
	get: function() {
		var obj = this.model.getRecord();
		if (obj !== NULL){
			this.name(obj.name);
			this.age(obj.age);
			this.sex(obj.sex);
			this.telnum(obj.telnum);
			this.addrnum(obj.addrnum);
			this.addr(obj.addr);
		}
		return obj;
	},
	
	getAll: function() {
		this.items.removeAll();
		var obj = this.model.getAll();
		if(obj) {
			console.info("getAll() = " + obj.results.length);
			for (var i = 0; i < obj.results.length; i++) {
				this.items.push(obj.results[i]);
			}
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
	}
};

// ------------------------
// Computed
ViewModel.isRecordMax = ko.computed(function() {
	return ViewModel.now() >= ViewModel.max();
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
