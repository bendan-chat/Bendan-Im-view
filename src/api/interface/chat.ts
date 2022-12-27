// * 聊天信息
export namespace Message {
	// * 0文本，1图片，2语音，3视频
	export type SendType = 0 | 1 | 2 | 3;

	export interface ResProps {
		id: number;
		sendType: SendType;
		content: string;
		sendTime: string;
		fromUuid: string;
		toUuid: string;
	}
}

// * 聊天列表
export namespace ChatList {
	export interface ResProps {
		id: number;
		userUuid: string;
		expertUuid: string;
		expertName: string;
		plantCategory: string;
		reportFormTitle: string;
		unreadMessageCount: number;
		firstPicture: string;
	}
}

export namespace Ws {
	export interface BaseMsg {
		code: number;
		fromUuid: string;
	}
}
