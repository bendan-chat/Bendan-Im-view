import http from "@/api/config/ClientConfig";
import { ChatServer } from "../config/servicePort";
import { ReqPage, ResPage } from "../interface/sys";

// * 获取聊天记录
export interface RecordPage extends ReqPage {
	userId: number;
	toId: number;
}
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
	 * 专家id
	
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
// 查询聊天记录
export const listRecord = (params: RecordPage) => {
	return http.get<ResPage<RecordData>>(ChatServer.Record + `/listRecord`, params, { headers: { noLoading: true } });
};
