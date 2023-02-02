import http from "@/api/config/ClientConfig";
import { AdminServer, ChatServer } from "../config/servicePort";
import { Chat } from "../interface/chat";
import { ReqPage, ResPage } from "../interface/sys";
import { Account } from "../interface/user";

/**
 * 查询聊天记录
 * @param page
 * @param userId
 * @param toId
 * */
export interface RecordPage extends ReqPage {
	userId: number;
	toId: number;
}
export const listRecord = (params: RecordPage) => {
	return http.get<ResPage<Chat.RecordData>>(ChatServer.Record + `/listRecord`, params, { headers: { noLoading: true } });
};

/**
 * 查询聊天列表
 * @param page
 * @param username
 * */
export interface ChatPage extends ReqPage {
	/**
	 * 用户id
	 */
	username: string;
}

export const listChat = (params: ChatPage) => {
	return http.get<Account.ChatUser[]>(AdminServer.Chat + `/getChatList`, params, { headers: { noLoading: true } });
};

export const getNewFriends = (userId: number) => {
	const param = {
		userId
	};
	return http.get<Chat.NewFriendList[]>(`${AdminServer.Chat}/getNewFriends`, param, { headers: { noLoading: true } });
};
