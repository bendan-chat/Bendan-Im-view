/**
 * @description 固定值，用于标识消息类型
 * 1 - 新的链接
 * 2 - 心跳
 * 3 - 聊天消息
 * 4 - 关闭链接
 */
export const SENDCODE = {
	NEW: 1,
	HEARTBEAT: 2,
	MESSAGE: 3,
	END: 4
} as const;
