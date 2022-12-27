// import { Message } from "@/api/interface/chat";
// import { SENDCODE } from "./type";

// interface SendMessageProps {
// 	code: typeof SENDCODE[keyof typeof SENDCODE];
// 	sendType?: Message.SendType;
// 	fromUuid?: string;
// 	toUuid?: string;
// 	content?: string;
// 	userUuid?: string;
// }

let ws: WebSocket | null;
let lockReconnect: boolean = false;

// ws 初始化
const createWsClient = () => {
	ws = new WebSocket(import.meta.env.VITE_WEB_SOCKET_URL);

	ws.onopen = function (e) {
		console.log(e);
	};
	ws.onerror = function (e) {
		console.log(e);
		reconnect();
	};
	ws.onclose = function (e) {
		console.log("websocket 断开: " + e.code + " " + e.reason + " " + e.wasClean);
	};
	ws.onmessage = function (event) {
		console.log("event", event);
		lockReconnect = true;
		//event 为服务端传输的消息，在这里可以处理
	};
};

const reconnect = () => {
	if (lockReconnect) return;
	//没连接上会一直重连，设置延迟避免请求过多
	setTimeout(function () {
		createWsClient();
		lockReconnect = false;
	}, 4000);
};

export { createWsClient, ws };
