// * 聊天信息
export namespace Message {
	// * 0文本，1图片，2语音，3视频 , 4文件
	export type SendType = 0 | 1 | 2 | 3 | 4;

	export const MsgType = {
		strMsg: 0 as SendType,
		pictureMsg: 1 as SendType,
		voiceMsg: 2 as SendType,
		videoMsg: 3 as SendType,
		fileMsg: 4 as SendType
	};

	export interface ResProps {
		id: number;
		sendType: SendType;
		content: string;
		sendTime: string;
		fromUuid: string;
		toUuid: string;
	}
}

// * 聊天记录
export namespace Chat {
	export interface RecordData {
		/**
		 *
		 */
		id: number;

		/**
		 * 用户id
		 */

		fromId: number;

		/**
		 * 发送对象id
		
		 */
		toId: number;

		/**
		 * 发送内容
		 */
		sendContent: string;

		/**
		 * 发送类型【0文本，1图片，2语言，3视频】
		 */
		sendType: number;

		/**
		 * 发送时长
		 */
		length: number;

		/**
		 * 发送时间
		 */
		sendTime: string;
	}

	export interface NewFriendList {
		/**
		 * id
		 */
		id: number;

		/**
		 * 当前 用户id
		 */
		curUserId: number;

		/**
		 * 主动添加 的 用户id
		 */
		addUserId: number;

		/**
		 * 主动添加 的 用户 昵称
		 */
		nickname: string;

		/**
		 * 主动添加 的 用户 头像
		 */
		avatar: string;

		/**
		 * 主动添加 的 用户 描述
		 */
		description: string;

		/**
		 * 主动添加 的 用户 添加状态
		 */
		status: number;

		/**
		 * 主动添加 的 用户 创建时间
		 */
		createTime: string;

		/**
		 * 主动添加 的 用户 更新时间
		 */
		updateTime: string;
	}
}

export namespace Ws {
	export interface BaseMsg {
		code: number;
		fromUuid: string;
	}
}
