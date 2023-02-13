/* eslint-disable @typescript-eslint/no-unused-vars */
import { store } from "@/redux";
import { publish } from "./helper/MyEvent";
import { SendCode, SendMessageProps } from "./type";

let ws: WebSocket | null;
let socketOpen: boolean = false;
let wsEvent: CustomEvent;

// ws 初始化
const createWsClient = () => {
	if (ws == undefined || ws == null) {
		ws = new WebSocket(import.meta.env.VITE_WEB_SOCKET_URL);
	}
	// socket 数据
	ws.onopen = function (e) {
		console.log("websocket建立连接: ", e);
		socketOpen = true;
		// 建立连接通道
		const { userId } = store.getState().global.userInfo;
		sendMessage({
			code: SendCode.NEW,
			fromId: userId
		});
		// * 心跳
		sendHeartbeat();
		// * 启动关闭连接
		// closeConnection();
	};
	ws.onerror = function (e) {
		console.log("websocket 出现异常: ", e);
		reconnect();
	};
	ws.onclose = function (e) {
		console.log("websocket 断开: " + e.code + " " + e.reason + " " + e.wasClean);
	};
	window.onbeforeunload = function () {
		closeConnection();
	};
	ws.onmessage = function (e) {
		let res = JSON.parse(e.data);
		handleWsMsg(res);
	};
};

/**
 * 返回消息匹配
 * @param res
 */
const handleWsMsg = (res: any) => {
	// eslint-disable-next-line no-empty
	if (res == 2) {
	} else if (res === 5) {
		publish("addNewFriend", res);
	} else if (res === 6) {
		publish("agreeNewFriend", res);
	} else {
		publish("wsMsg", res);
	}
};

/**
 * 发送消息
 */
const sendMessage = (obj: SendMessageProps): Promise<any> => {
	return new Promise(() => {
		ws?.send(JSON.stringify(obj));
	});
};

/**
 * 心跳 Web Socket
 */
const sendHeartbeat = () => {
	setInterval(() => {
		if (socketOpen) {
			sendMessage({
				code: SendCode.HEARTBEAT
			});
		}
	}, 8000);
};

/**
 * 关闭 Web Socket
 */
const closeConnection = () => {
	ws?.close();
};

/**
 * 重连 Web Socket
 */
const reconnect = () => {
	//没连接上会一直重连，设置延迟避免请求过多
	createWsClient();
};

export { createWsClient, ws, sendMessage, wsEvent };
