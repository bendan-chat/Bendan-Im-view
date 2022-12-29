import { Message } from "@/api/interface/chat";
import { store } from "@/redux";
import { SendCode } from "./type";

interface SendMessageProps {
	code: typeof SendCode[keyof typeof SendCode];
	sendType?: Message.SendType;
	fromId?: number;
	toId?: number;
	content?: string;
	userId?: number;
}

let ws: WebSocket | null;
let socketOpen: boolean = false;

// * 关闭连接定时器
let closeTimer: ReturnType<typeof setTimeout> | undefined;

// ws 初始化
const createWsClient = () => {
	ws = new WebSocket(import.meta.env.VITE_WEB_SOCKET_URL);
	ws.onopen = function (e) {
		console.log("onopen: ", e);
		socketOpen = true;
		// * 发送连接成功请求
		const userInfo = store.getState().global.userInfo;

		// 建立连接通道
		sendMessage({
			code: SendCode.NEW,
			fromId: userInfo.userId
		});
		// * 心跳
		sendHeartbeat();
		// * 启动关闭连接
		closeConnection();
	};
	ws.onerror = function (e) {
		console.log("onerror: ", e);
		reconnect();
	};
	ws.onclose = function (e) {
		console.log("websocket 断开: " + e.code + " " + e.reason + " " + e.wasClean);
		socketOpen = false;
	};
	ws.onmessage = function (event) {
		console.log("event", event);
		handleMsg(event);
	};
};

const handleMsg = (event: MessageEvent<any>) => {
	const result = JSON.parse(event.data as string);
	// * 处理心跳
	if (result === 2) {
		clearTimeout(closeTimer); // 清除定时关闭的连接
		closeConnection(); // 再次打开
	}
};

/**
 * 发送消息
 */
const sendMessage = (obj: SendMessageProps): Promise<any> => {
	return new Promise((resolve, reject) => {
		try {
			if (socketOpen) {
				ws?.send(JSON.stringify(obj));
			} else {
				reject(new Error("未连接服务"));
			}
		} catch (e) {
			console.log(e);
		}
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
	closeTimer = setTimeout(() => {
		ws?.close();
	}, 10000);
};

/**
 * 重连 Web Socket
 */
const reconnect = () => {
	if (socketOpen) return;
	//没连接上会一直重连，设置延迟避免请求过多
	createWsClient();
};

export { createWsClient, ws };
