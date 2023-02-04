import { Message } from "@/api/interface/chat";

/**
 * @description 固定值，用于标识消息类型
 * 1 - 新的链接
 * 2 - 心跳
 * 3 - 聊天消息
 * 4 - 关闭链接
 */
export const SendCode = {
	NEW: 1,
	HEARTBEAT: 2,
	MESSAGE: 3,
	END: 4,
	ADD_NEWFRIEND: 5,
	AGREE_NEWFRIEND: 6
} as const;

export interface SendMessageProps {
	code: typeof SendCode[keyof typeof SendCode];
	sendType?: Message.SendType;
	fromId?: number;
	toId?: number;
	sendContent?: string;
	userId?: number;
	length?: number;
}
