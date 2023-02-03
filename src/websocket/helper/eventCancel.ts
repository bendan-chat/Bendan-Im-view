import { SendMessageProps } from "..";

// * 监听中的事件队列
let eventList: SendMessageProps[] = [];

// * 删除队列中的某个事件
const delQuque = (eventName: SendMessageProps) => {
	const index = Ququehas(eventName);
	index !== -1 ? eventList.splice(index, 1) : null;
};

// * 添加到队列中
const addQuque = (eventName: SendMessageProps) => {
	eventList.push(eventName);
};

/**
 * 获取第一元素
 * @returns -1不存在，0>存在
 */
const getQuqueFast = () => {
	if (eventList.length > 0) {
		let res = eventList[0];
		eventList.splice(0, 1);
		return res;
	}
	return -1;
};

/**
 * 获取最后一个元素
 * @returns
 */
const getQuqueLast = () => {
	if (eventList.length > 0) {
		return eventList.pop();
	}
	return -1;
};

/**
 * 判断是否存在
 * @param eventName
 * @returns -1不存在，0>存在
 */
const Ququehas = (eventName: SendMessageProps): number => {
	const index = eventList.findIndex(item => item === eventName);
	return index;
};

// * 清空队列
const removeQuqueAll = () => {
	eventList = [];
};

export default {
	delQuque,
	addQuque,
	Ququehas,
	getQuqueFast,
	getQuqueLast,
	removeQuqueAll,
	eventList
};
