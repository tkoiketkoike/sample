// Jest �e�X�g�t�@�C��

const svrmodel = require('./svrmodel');

// �v���v����DB�t�@�C���������Ă�������������

test("for Server Side Model", () => {
	let obj = {"name":"Yamada Taro","age":"44","sex":"Man","telnum":"03-1234-5678","addrnum":"123-4567","addr":"Gunma Takasaki Shibasaki 00-00-00"};
	expect(svrmodel.set(obj)).toBe('OK');
	
	obj = {"name":"","age":"","sex":"","telnum":"","addrnum":"","addr":""};
	expect(svrmodel.set(obj)).toBe('NG');
	obj = {"name":"a","age":"","sex":"","telnum":"","addrnum":"","addr":""};
	expect(svrmodel.set(obj)).toBe('OK');
	obj = {"name":"","age":"","sex":"Man","telnum":"","addrnum":"","addr":""};
	expect(svrmodel.set(obj)).toBe('NG');
	obj = {"name":"","age":"","sex":"","telnum":"000-000-0000","addrnum":"","addr":""};
	expect(svrmodel.set(obj)).toBe('NG');
	obj = {"name":"","age":"","sex":"","telnum":"","addrnum":"000-0000","addr":""};
	expect(svrmodel.set(obj)).toBe('NG');
	obj = {"name":"","age":"","sex":"","telnum":"","addrnum":"","addr":"Takasaki,Gunma"};
	expect(svrmodel.set(obj)).toBe('NG');
	
	// :
	
});
