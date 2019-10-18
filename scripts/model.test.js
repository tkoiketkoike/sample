// Jest テストファイル

const model = require('./model');

test("Model test", () => {
	// 
	var inst = Object.create(model);
	
	var obj = {"name":"aaa","age":"","sex":"","telnum":"","addrnum":"","addr":""};
	expect(inst.setRecord(obj)).toEqual(undefined);
	
	
});
