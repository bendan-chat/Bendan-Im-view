import { RouteObject } from "@/routers/interface";
import { Menus } from "@/api/interface/menu";
import { Message } from "@/api/interface/chat";

/**
 * 匹配文件类型 返回 Message.MsgType
 * @param fileName
 */
export function matchFileSuffix(fileName: string) {
	const fileNameSuffix = fileName.split(".")[1];
	if (fileNameSuffix.match("jpg") || fileNameSuffix.match("png") || fileNameSuffix.match("gif")) {
		return Message.MsgType.pictureMsg;
	} else if (fileNameSuffix.match("mp4")) {
		return Message.MsgType.videoMsg;
	}
	// else if (fileNameSuffix.match("mp3") || fileNameSuffix.match("wav") || fileNameSuffix.match("pcm")) {
	// 	return Message.MsgType.voiceMsg;
	// }
	else {
		return Message.MsgType.fileMsg;
	}
}

/**
 * 分割上传路径 取后缀
 * 如果不是url 直接返回
 * @param urls
 * @returns
 */
export function splitUrlToFileName(url: string) {
	const urlArgs: string[] | undefined = url?.split("/");
	// let arg = urlArgs![0];
	if (urlArgs![0].match("http") == null) {
		return url;
	} else {
		const nameArgs: string[] | undefined = urlArgs![urlArgs!.length - 1].split(".");
		let name = decodeURI(nameArgs[0]);
		let suffixName = nameArgs[1];
		return name + "." + suffixName;
	}
}

/**
 * @description 获取localStorage
 * @param {String} key Storage名称
 * @return string
 */
export const localGet = (key: string) => {
	const value = window.localStorage.getItem(key);
	try {
		return JSON.parse(window.localStorage.getItem(key) as string);
	} catch (error) {
		return value;
	}
};

/**
 * @description 存储localStorage
 * @param {String} key Storage名称
 * @param {Any} value Storage值
 * @return void
 */
export const localSet = (key: string, value: any) => {
	window.localStorage.setItem(key, JSON.stringify(value));
};

/**
 * @description 清除localStorage
 * @param {String} key Storage名称
 * @return void
 */
export const localRemove = (key: string) => {
	window.localStorage.removeItem(key);
};

/**
 * @description 清除所有localStorage
 * @return void
 */
export const localClear = () => {
	window.localStorage.clear();
};

/**
 * @description 获取浏览器默认语言
 * @return string
 */
export const getBrowserLang = () => {
	let browserLang = navigator.language ? navigator.language : navigator.browserLanguage;
	let defaultBrowserLang = "";
	if (browserLang.toLowerCase() === "cn" || browserLang.toLowerCase() === "zh" || browserLang.toLowerCase() === "zh-cn") {
		defaultBrowserLang = "zh";
	} else {
		defaultBrowserLang = "en";
	}
	return defaultBrowserLang;
};

/**
 * @description 获取需要展开的 subMenu
 * @param {String} path 当前访问地址
 * @returns array
 */
export const getOpenKeys = (path: string) => {
	let newStr: string = "";
	let newArr: any[] = [];
	let arr = path.split("/").map(i => "/" + i);
	for (let i = 1; i < arr.length - 1; i++) {
		newStr += arr[i];
		newArr.push(newStr);
	}
	return newArr;
};

/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export const searchRoute = (path: string, routes: RouteObject[] = []): RouteObject => {
	let result: RouteObject = {};
	for (let item of routes) {
		if (item.path === path) return item;
		if (item.children) {
			const res = searchRoute(path, item.children);
			if (Object.keys(res).length) result = res;
		}
	}
	return result;
};

/**
 * @description 使用递归处理路由菜单，生成一维数组，做菜单权限判断
 * @param {Array} menuList 所有菜单列表
 * @param {Array} newArr 菜单的一维数组
 * @return array
 */
export function handleRouter(routerList: Menus.MenuParams[], newArr: string[] = []) {
	routerList.forEach((item: Menus.MenuParams) => {
		typeof item === "object" && item.path && newArr.push(item.path);
		item.children && item.children.length && handleRouter(item.children, newArr);
	});
	return newArr;
}

/**
 * @description 判断数据类型
 * @param {Any} val 需要判断类型的数据
 * @return string
 */
export const isType = (val: any) => {
	if (val === null) return "null";
	if (typeof val !== "object") return typeof val;
	else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
};

/**
 * @description 对象数组深克隆
 * @param {Object} obj 源对象
 * @return object
 */
export const deepCopy = <T>(obj: any): T => {
	let newObj: any;
	try {
		newObj = obj.push ? [] : {};
	} catch (error) {
		newObj = {};
	}
	for (let attr in obj) {
		if (typeof obj[attr] === "object") {
			newObj[attr] = deepCopy(obj[attr]);
		} else {
			newObj[attr] = obj[attr];
		}
	}
	return newObj;
};

/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return number
 */
export function randomNum(min: number, max: number): number {
	let num = Math.floor(Math.random() * (min - max) + max);
	return num;
}

/**
 * 隐藏身份信息中间细节
 * @param k PassPort
 * @returns hiddenPassPort
 */
export function hiddenPassPort(k: string) {
	let len = k.length;

	// 常量
	const isEvenNum = len % 2 == 0;
	let stars = "*";
	let saveLen = Math.ceil(len / 4);

	let resHeader = k.substring(0, saveLen);
	let resTail = k.substring(len - saveLen + 1, len + 1);
	let starsLen = isEvenNum ? len - saveLen * 2 : len - saveLen * 2 + 1;
	for (let i = 0; i <= starsLen; i++) {
		stars = stars + "*";
	}
	return resHeader + stars + resTail;
}

/**
 * 密码包含 数字,英文(不区分大小写),字符中的三种以上，长度8-16
 * 满足三种条件
 * @param password 密码
 * @returns 如果满足返回 true; 反之
 */
export function isPasswordCheck3(password: string) {
	let three = "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,16}";
	return password.match(three) != null;
}

/**
 * 至少包含数字跟字母，可以有字符
 * 满足二种条件
 * @param password
 * @returns 如果满足返回 true; 反之
 */
export function isPasswordCheck2(password: string) {
	let two = "^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,16}$";
	return password.match(two) != null;
}
