import http from "@/api/config/ClientConfig";
import { AdminServer, ChatServer } from "../config/servicePort";
import { Chat } from "../interface/chat";
import { ReqPage, ResPage } from "../interface/sys";
import { Account } from "../interface/user";
import qs from "qs";

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

/**
 * 查询好友
 * @param userId
 * @returns
 */
export const getNewFriends = (userId: number) => {
	const param = {
		userId
	};
	return http.get<Chat.NewFriendList[]>(`${AdminServer.Chat}/getNewFriends`, param, { headers: { noLoading: true } });
};

/**
 * 新增好友
 * @param newFriend
 * @returns
 */
export const addNewFriend = (addFriendRelEntity: Chat.NewFriendList) => {
	return http.post<Chat.NewFriendList[]>(`${AdminServer.Chat}/addFriend`, addFriendRelEntity, { headers: { noLoading: true } });
};

/**
 * 同意 新增好友
 * @param newFriend
 * @returns
 */
export const agreeAddNewFriend = (addFriendRelId: number) => {
	return http.post<Chat.NewFriendList[]>(`${AdminServer.Chat}/agreeAddFriend`, qs.stringify({ addFriendRelId }), {
		headers: { noLoading: true }
	});
};
