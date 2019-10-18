// Jest �e�X�g�t�@�C��

const svrmodel = require('./svrmodel');
var fs = require('fs');
fs.unlinkSync('./USER');

test("for Server Side Model", () => {
	
	// �e�v�f�݂̂̃e�X�g
	let obj = {"name":"","age":"","sex":"","telnum":"","addrnum":"","addr":""};
	expect(svrmodel.set(obj)).toBe('NG');
	obj = {"name":"Yamada Taro","age":"","sex":"","telnum":"","addrnum":"","addr":""};
	expect(svrmodel.set(obj)).toBe('OK');
	obj = {"name":"","age":"","sex":"MAN","telnum":"","addrnum":"","addr":""};
	expect(svrmodel.set(obj)).toBe('NG');
	obj = {"name":"","age":"","sex":"","telnum":"000-000-0000","addrnum":"","addr":""};
	expect(svrmodel.set(obj)).toBe('NG');
	obj = {"name":"","age":"","sex":"","telnum":"","addrnum":"000-0000","addr":""};
	expect(svrmodel.set(obj)).toBe('NG');
	obj = {"name":"","age":"","sex":"","telnum":"","addrnum":"","addr":"Takasaki,Gunma"};
	expect(svrmodel.set(obj)).toBe('NG');
	
	// �폜�e�X�g
	expect(svrmodel.delete("Suzuki Jiro")).toBe('NG');
	expect(svrmodel.delete("Yamada")).toBe('NG');
	expect(svrmodel.delete("Taro")).toBe('NG');
	expect(svrmodel.delete("Yamada Ta")).toBe('NG');
	expect(svrmodel.delete("Yamada Taro")).toBe('OK');
	
	// MaxMin�e�X�g
	// count/set/delete
	expect(svrmodel.count(obj)).toBe(0);
	obj = {"name":"Yamada Taro","age":"44","sex":"MAN","telnum":"03-1234-5678","addrnum":"123-4567","addr":"Gunma Takasaki 00-00-00"};
	expect(svrmodel.set(obj)).toBe('OK');
	expect(svrmodel.count(obj)).toBe(1);
	expect(svrmodel.get()).toEqual([{"name":"Yamada Taro","age":"44","sex":"MAN","telnum":"03-1234-5678","addrnum":"123-4567","addr":"Gunma Takasaki 00-00-00"}]);
	
	obj = {"name":"Suzuki Jiro","age":"8","sex":"MAN","telnum":"000-000-0000","addrnum":"700-0000","addr":"Gunma Maebashi 00"};
	expect(svrmodel.set(obj)).toBe('OK');
	expect(svrmodel.count(obj)).toBe(2);
	expect(svrmodel.get()).toEqual([{"name":"Yamada Taro","age":"44","sex":"MAN","telnum":"03-1234-5678","addrnum":"123-4567","addr":"Gunma Takasaki 00-00-00"},{"name":"Suzuki Jiro","age":"8","sex":"MAN","telnum":"000-000-0000","addrnum":"700-0000","addr":"Gunma Maebashi 00"}]);
	
	obj = {"name":"Tanaka Saburo","age":"102","sex":"MAN","telnum":"000-100-1000","addrnum":"003-0000","addr":"Gunma Shibukawa 00"};
	expect(svrmodel.set(obj)).toBe('OK');
	expect(svrmodel.count(obj)).toBe(3);
	expect(svrmodel.get()).toEqual([{"name":"Yamada Taro","age":"44","sex":"MAN","telnum":"03-1234-5678","addrnum":"123-4567","addr":"Gunma Takasaki 00-00-00"},{"name":"Suzuki Jiro","age":"8","sex":"MAN","telnum":"000-000-0000","addrnum":"700-0000","addr":"Gunma Maebashi 00"},{"name":"Tanaka Saburo","age":"102","sex":"MAN","telnum":"000-100-1000","addrnum":"003-0000","addr":"Gunma Shibukawa 00"}]);
	
	obj = {"name":"Yamada Yoko","age":"12","sex":"WOMAN","telnum":"111-100-100000","addrnum":"100-0000","addr":"Gunma Haruna"};
	expect(svrmodel.set(obj)).toBe('OK');
	expect(svrmodel.count(obj)).toBe(4);
	expect(svrmodel.get()).toEqual([{"name":"Yamada Taro","age":"44","sex":"MAN","telnum":"03-1234-5678","addrnum":"123-4567","addr":"Gunma Takasaki 00-00-00"},{"name":"Suzuki Jiro","age":"8","sex":"MAN","telnum":"000-000-0000","addrnum":"700-0000","addr":"Gunma Maebashi 00"},{"name":"Tanaka Saburo","age":"102","sex":"MAN","telnum":"000-100-1000","addrnum":"003-0000","addr":"Gunma Shibukawa 00"},{"name":"Yamada Yoko","age":"12","sex":"WOMAN","telnum":"111-100-100000","addrnum":"100-0000","addr":"Gunma Haruna"}]);
	
	obj = {"name":"Tamura Ryoko","age":"25","sex":"WOMAN","telnum":"000-300-0040","addrnum":"111","addr":"Gunma Akagi 00"};
	expect(svrmodel.set(obj)).toBe('OK');
	expect(svrmodel.count(obj)).toBe(5);
	expect(svrmodel.get()).toEqual([{"name":"Yamada Taro","age":"44","sex":"MAN","telnum":"03-1234-5678","addrnum":"123-4567","addr":"Gunma Takasaki 00-00-00"},{"name":"Suzuki Jiro","age":"8","sex":"MAN","telnum":"000-000-0000","addrnum":"700-0000","addr":"Gunma Maebashi 00"},{"name":"Tanaka Saburo","age":"102","sex":"MAN","telnum":"000-100-1000","addrnum":"003-0000","addr":"Gunma Shibukawa 00"},{"name":"Yamada Yoko","age":"12","sex":"WOMAN","telnum":"111-100-100000","addrnum":"100-0000","addr":"Gunma Haruna"},{"name":"Tamura Ryoko","age":"25","sex":"WOMAN","telnum":"000-300-0040","addrnum":"111","addr":"Gunma Akagi 00"}]);
	
	obj = {"name":"Sato Shiro","age":"43","sex":"Man","telnum":"1000","addrnum":"00-0500","addr":"Gunma Oota 100-5"};
	expect(svrmodel.set(obj)).toBe('OK');
	expect(svrmodel.count(obj)).toBe(6);
	expect(svrmodel.get()).toEqual([{"name":"Yamada Taro","age":"44","sex":"MAN","telnum":"03-1234-5678","addrnum":"123-4567","addr":"Gunma Takasaki 00-00-00"},{"name":"Suzuki Jiro","age":"8","sex":"MAN","telnum":"000-000-0000","addrnum":"700-0000","addr":"Gunma Maebashi 00"},{"name":"Tanaka Saburo","age":"102","sex":"MAN","telnum":"000-100-1000","addrnum":"003-0000","addr":"Gunma Shibukawa 00"},{"name":"Yamada Yoko","age":"12","sex":"WOMAN","telnum":"111-100-100000","addrnum":"100-0000","addr":"Gunma Haruna"},{"name":"Tamura Ryoko","age":"25","sex":"WOMAN","telnum":"000-300-0040","addrnum":"111","addr":"Gunma Akagi 00"},{"name":"Sato Shiro","age":"43","sex":"Man","telnum":"1000","addrnum":"00-0500","addr":"Gunma Oota 100-5"}]);
	
	obj = {"name":"Ito Goro","age":"55","sex":"Man","telnum":"0","addrnum":"9","addr":"Gunma Kiryu 00"};
	expect(svrmodel.set(obj)).toBe('OK');
	expect(svrmodel.count(obj)).toBe(7);
	expect(svrmodel.get()).toEqual([{"name":"Yamada Taro","age":"44","sex":"MAN","telnum":"03-1234-5678","addrnum":"123-4567","addr":"Gunma Takasaki 00-00-00"},{"name":"Suzuki Jiro","age":"8","sex":"MAN","telnum":"000-000-0000","addrnum":"700-0000","addr":"Gunma Maebashi 00"},{"name":"Tanaka Saburo","age":"102","sex":"MAN","telnum":"000-100-1000","addrnum":"003-0000","addr":"Gunma Shibukawa 00"},{"name":"Yamada Yoko","age":"12","sex":"WOMAN","telnum":"111-100-100000","addrnum":"100-0000","addr":"Gunma Haruna"},{"name":"Tamura Ryoko","age":"25","sex":"WOMAN","telnum":"000-300-0040","addrnum":"111","addr":"Gunma Akagi 00"},{"name":"Sato Shiro","age":"43","sex":"Man","telnum":"1000","addrnum":"00-0500","addr":"Gunma Oota 100-5"},{"name":"Ito Goro","age":"55","sex":"Man","telnum":"0","addrnum":"9","addr":"Gunma Kiryu 00"}]);
	
	obj = {"name":"Watanabe Rokuro","age":"67","sex":"Man","telnum":"100-1000","addrnum":"555-4444","addr":"Tatebayashi Gunma 1-45-3"};
	expect(svrmodel.set(obj)).toBe('OK');
	expect(svrmodel.count(obj)).toBe(8);
	expect(svrmodel.get()).toEqual([{"name":"Yamada Taro","age":"44","sex":"MAN","telnum":"03-1234-5678","addrnum":"123-4567","addr":"Gunma Takasaki 00-00-00"},{"name":"Suzuki Jiro","age":"8","sex":"MAN","telnum":"000-000-0000","addrnum":"700-0000","addr":"Gunma Maebashi 00"},{"name":"Tanaka Saburo","age":"102","sex":"MAN","telnum":"000-100-1000","addrnum":"003-0000","addr":"Gunma Shibukawa 00"},{"name":"Yamada Yoko","age":"12","sex":"WOMAN","telnum":"111-100-100000","addrnum":"100-0000","addr":"Gunma Haruna"},{"name":"Tamura Ryoko","age":"25","sex":"WOMAN","telnum":"000-300-0040","addrnum":"111","addr":"Gunma Akagi 00"},{"name":"Sato Shiro","age":"43","sex":"Man","telnum":"1000","addrnum":"00-0500","addr":"Gunma Oota 100-5"},{"name":"Ito Goro","age":"55","sex":"Man","telnum":"0","addrnum":"9","addr":"Gunma Kiryu 00"},{"name":"Watanabe Rokuro","age":"67","sex":"Man","telnum":"100-1000","addrnum":"555-4444","addr":"Tatebayashi Gunma 1-45-3"}]);
	
	obj = {"name":"Yamamoto Shichiro","age":"70","sex":"Man","telnum":"080-1245-1000","addrnum":"100-9999","addr":"Gunma Fujioka 00"};
	expect(svrmodel.set(obj)).toBe('OK');
	expect(svrmodel.count(obj)).toBe(9);
	expect(svrmodel.get()).toEqual([{"name":"Yamada Taro","age":"44","sex":"MAN","telnum":"03-1234-5678","addrnum":"123-4567","addr":"Gunma Takasaki 00-00-00"},{"name":"Suzuki Jiro","age":"8","sex":"MAN","telnum":"000-000-0000","addrnum":"700-0000","addr":"Gunma Maebashi 00"},{"name":"Tanaka Saburo","age":"102","sex":"MAN","telnum":"000-100-1000","addrnum":"003-0000","addr":"Gunma Shibukawa 00"},{"name":"Yamada Yoko","age":"12","sex":"WOMAN","telnum":"111-100-100000","addrnum":"100-0000","addr":"Gunma Haruna"},{"name":"Tamura Ryoko","age":"25","sex":"WOMAN","telnum":"000-300-0040","addrnum":"111","addr":"Gunma Akagi 00"},{"name":"Sato Shiro","age":"43","sex":"Man","telnum":"1000","addrnum":"00-0500","addr":"Gunma Oota 100-5"},{"name":"Ito Goro","age":"55","sex":"Man","telnum":"0","addrnum":"9","addr":"Gunma Kiryu 00"},{"name":"Watanabe Rokuro","age":"67","sex":"Man","telnum":"100-1000","addrnum":"555-4444","addr":"Tatebayashi Gunma 1-45-3"},{"name":"Yamamoto Shichiro","age":"70","sex":"Man","telnum":"080-1245-1000","addrnum":"100-9999","addr":"Gunma Fujioka 00"}]);
	
	obj = {"name":"Nakamura Hachiro","age":"84","sex":"Man","telnum":"000-100-1000","addrnum":"003-0000","addr":"Gunma Annaka 1054-45"};
	expect(svrmodel.set(obj)).toBe('OK');
	expect(svrmodel.count(obj)).toBe(10);
	expect(svrmodel.get()).toEqual([{"name":"Yamada Taro","age":"44","sex":"MAN","telnum":"03-1234-5678","addrnum":"123-4567","addr":"Gunma Takasaki 00-00-00"},{"name":"Suzuki Jiro","age":"8","sex":"MAN","telnum":"000-000-0000","addrnum":"700-0000","addr":"Gunma Maebashi 00"},{"name":"Tanaka Saburo","age":"102","sex":"MAN","telnum":"000-100-1000","addrnum":"003-0000","addr":"Gunma Shibukawa 00"},{"name":"Yamada Yoko","age":"12","sex":"WOMAN","telnum":"111-100-100000","addrnum":"100-0000","addr":"Gunma Haruna"},{"name":"Tamura Ryoko","age":"25","sex":"WOMAN","telnum":"000-300-0040","addrnum":"111","addr":"Gunma Akagi 00"},{"name":"Sato Shiro","age":"43","sex":"Man","telnum":"1000","addrnum":"00-0500","addr":"Gunma Oota 100-5"},{"name":"Ito Goro","age":"55","sex":"Man","telnum":"0","addrnum":"9","addr":"Gunma Kiryu 00"},{"name":"Watanabe Rokuro","age":"67","sex":"Man","telnum":"100-1000","addrnum":"555-4444","addr":"Tatebayashi Gunma 1-45-3"},{"name":"Yamamoto Shichiro","age":"70","sex":"Man","telnum":"080-1245-1000","addrnum":"100-9999","addr":"Gunma Fujioka 00"},{"name":"Nakamura Hachiro","age":"84","sex":"Man","telnum":"000-100-1000","addrnum":"003-0000","addr":"Gunma Annaka 1054-45"}]);
	
	obj = {"name":"Kobayashi Kuro","age":"99","sex":"Man","telnum":"0000","addrnum":"0-0000","addr":"Gunma Tomioka 32-1-5-456"};
	expect(svrmodel.set(obj)).toBe('NG');
	expect(svrmodel.count(obj)).toBe(10);
	expect(svrmodel.get()).toEqual([{"name":"Yamada Taro","age":"44","sex":"MAN","telnum":"03-1234-5678","addrnum":"123-4567","addr":"Gunma Takasaki 00-00-00"},{"name":"Suzuki Jiro","age":"8","sex":"MAN","telnum":"000-000-0000","addrnum":"700-0000","addr":"Gunma Maebashi 00"},{"name":"Tanaka Saburo","age":"102","sex":"MAN","telnum":"000-100-1000","addrnum":"003-0000","addr":"Gunma Shibukawa 00"},{"name":"Yamada Yoko","age":"12","sex":"WOMAN","telnum":"111-100-100000","addrnum":"100-0000","addr":"Gunma Haruna"},{"name":"Tamura Ryoko","age":"25","sex":"WOMAN","telnum":"000-300-0040","addrnum":"111","addr":"Gunma Akagi 00"},{"name":"Sato Shiro","age":"43","sex":"Man","telnum":"1000","addrnum":"00-0500","addr":"Gunma Oota 100-5"},{"name":"Ito Goro","age":"55","sex":"Man","telnum":"0","addrnum":"9","addr":"Gunma Kiryu 00"},{"name":"Watanabe Rokuro","age":"67","sex":"Man","telnum":"100-1000","addrnum":"555-4444","addr":"Tatebayashi Gunma 1-45-3"},{"name":"Yamamoto Shichiro","age":"70","sex":"Man","telnum":"080-1245-1000","addrnum":"100-9999","addr":"Gunma Fujioka 00"},{"name":"Nakamura Hachiro","age":"84","sex":"Man","telnum":"000-100-1000","addrnum":"003-0000","addr":"Gunma Annaka 1054-45"}]);
	
//	expect(svrmodel.get()).toEqual(9);
	
	expect(svrmodel.delete("Yamada Taro")).toBe('OK');
	expect(svrmodel.count(obj)).toBe(9);
	expect(svrmodel.delete("Nakamura Hachiro")).toBe('OK');
	expect(svrmodel.count(obj)).toBe(8);
	expect(svrmodel.delete("Tamura Ryoko")).toBe('OK');
	expect(svrmodel.count(obj)).toBe(7);
	expect(svrmodel.delete("Suzuki Jiro")).toBe('OK');
	expect(svrmodel.count(obj)).toBe(6);
	expect(svrmodel.delete("Yamada Yoko")).toBe('OK');
	expect(svrmodel.count(obj)).toBe(5);
	expect(svrmodel.delete("Tanaka Saburo")).toBe('OK');
	expect(svrmodel.count(obj)).toBe(4);
	expect(svrmodel.delete("Sato Shiro")).toBe('OK');
	expect(svrmodel.count(obj)).toBe(3);
	expect(svrmodel.delete("Ito Goro")).toBe('OK');
	expect(svrmodel.count(obj)).toBe(2);
	expect(svrmodel.delete("Watanabe Rokuro")).toBe('OK');
	expect(svrmodel.count(obj)).toBe(1);
	expect(svrmodel.delete("Yamamoto Shichiro")).toBe('OK');
	expect(svrmodel.count(obj)).toBe(0);
	expect(svrmodel.delete("Nakamura Hachiro")).toBe('NG');
	expect(svrmodel.count(obj)).toBe(0);
	
});
