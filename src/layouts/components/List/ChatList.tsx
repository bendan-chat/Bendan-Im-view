/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { store } from "@/redux";
import { useNavigate } from "react-router-dom";
import { Account } from "@/api/interface/user";
import { List, Avatar, Input, Space, Badge, AutoComplete } from "antd";

import { clearUnreadChatMsg, getUnreadChatList, listChat } from "@/api/modules/chat";
import { splitUrlToFileName } from "@/utils/util";
import { subscribe, unsubscribe } from "@/websocket/helper/MyEvent";

import "./ChatList.less";
import { setToAvatar } from "@/redux/modules/chat/action";

const ChatList = () => {
	const [chatUsers, setChatUsers] = useState<Account.ChatUser[]>([]);
	const [options, setOptions] = useState<{ label: JSX.Element }[]>([]);
	const [selectId, setSelectId] = useState<number>();
	const [counts, setCounts] = useState<Map<number, number>>(new Map<number, number>());

	const navigate = useNavigate();
	const { userId } = store.getState().global.userInfo;

	window.onbeforeunload = function () {
		console.log();
	};

	useEffect(() => {
		setCounts(counts);
	}, [counts]);
	/**
	 * 初始加载聊天聊表
	 */
	useEffect(() => {
		loadChatList();
		loadUnreadChatList();
	}, []);
	// useEffect listener
	useEffect(() => {
		subscribe("clearUnreadMsg", clearUnreadMsgListener);
		return () => {
			unsubscribe("clearUnreadMsg", clearUnreadMsgListener);
		};
	}, []);
	useEffect(() => {
		subscribe("agreeNewFriend", agreeNewFriendListener);
		return () => {
			unsubscribe("agreeNewFriend", agreeNewFriendListener);
		};
	}, []);
	useEffect(() => {
		subscribe("wsMsg", wsMsgListener);
		return () => {
			unsubscribe("wsMsg", wsMsgListener);
		};
	}, []);

	/**
	 * 捕获ws消息 处理成微标
	 */
	function wsMsgListener(e: any) {
		let fromId = Number.parseInt(e.detail.fromId);
		handlerBadgeByfromId(fromId);
	}

	/**
	 * 清空微标
	 */
	function clearUnreadMsgListener(e: any) {
		const { fromId, toId } = e.detail;
		let fromIdNum = Number.parseInt(fromId);
		let toIdNum = Number.parseInt(toId);
		if (!Number.isNaN(fromIdNum) && !Number.isNaN(toIdNum)) {
			clearUserBadge(fromIdNum, toIdNum);
		}
	}

	/**
	 * 捕获新增好友消息 ·
	 */
	function agreeNewFriendListener() {
		loadChatList();
	}

	/**
	 * 加载聊天列表
	 */
	async function loadChatList() {
		const { data } = await listChat(userId);
		setChatUsers(data);
	}

	/**
	 * 查询未读聊天记录
	 */
	async function loadUnreadChatList() {
		const { data } = await getUnreadChatList(userId);
		if (data.length > 0) {
			data.map((value, index) => {
				let fromId = value.fromId;
				handlerBadgeByfromId(fromId);
			});
		}
	}

	/**
	 * 处理微标数
	 * @param fromId
	 */
	function handlerBadgeByfromId(fromId: number) {
		if (counts.has(fromId)) {
			counts.set(fromId, counts.get(fromId)! + 1);
			setCounts(counts);
		} else {
			counts.set(fromId, 1);
			setCounts(counts);
		}
	}

	/**
	 * 聊天消息处理
	 * @param item
	 */
	function handlerLastMsg(lastMsgArg: string) {
		// * 0文本，1图片，2语音，3视频 , 4文件
		let msg: string;
		const msgTemp = splitUrlToFileName(lastMsgArg);
		let msgSplit = msgTemp.split(".");
		if (msgSplit.length == 1) {
			msg = "str";
		} else {
			msg = msgSplit[1];
		}
		switch (msg!) {
			case "str":
				return msgTemp.length > 10 ? msgTemp.substring(0, 10) + "......" : msgTemp;
			case "wav":
				return "[语音]";
			case "mp4":
				return "[视频]" + msgTemp;
			case "gif" || "png" || "jpg":
				return "[图片]" + msgTemp;
			default:
				return "[文件]" + msgTemp;
		}
	}

	/**
	 * 搜索 好友
	 */
	function onSearch(value: string) {
		let res: { label: JSX.Element }[] = [];
		if (!value) {
			res = [];
		} else {
			let filter = chatUsers
				.filter(v => {
					if (v.nickName?.includes(value)) {
						return v;
					}
				})
				.map(item => {
					return {
						label: (
							<>
								<List.Item
									className={`${selectId === item.id ? "active-user" : ""}`}
									onClick={() => {
										navigate("/chat" + "/" + item.id);
										clearUserBadge(userId, item.id);
										setSelectId(item.id);
										store.dispatch(setToAvatar(item.avatar as string));
									}}
								>
									<List.Item.Meta avatar={<Avatar src={item.avatar} size="large" />} title={item.nickName} />
								</List.Item>
							</>
						)
					};
				});
			res = filter;
		}
		setOptions(res);
	}

	/**
	 * 清除用户微标
	 * @param toId
	 */
	function clearUserBadge(userId: number, toId: number) {
		try {
			if (counts.has(toId)) {
				counts.delete(toId);
				setCounts(counts);
				clearUnreadChatMsg(userId, toId);
			}
			setCounts(counts);
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<div>
			<div className="search-friend-class">
				<Space>
					<AutoComplete
						allowClear={true}
						style={{ width: 200 }}
						onSearch={onSearch}
						placeholder="搜索聊天列表......"
						options={options}
					/>
				</Space>
			</div>
			<div className="chat-list">
				<List
					itemLayout="horizontal"
					dataSource={chatUsers}
					renderItem={item => (
						<List.Item
							className={`${selectId === item.id ? "active-user" : ""}`}
							onClick={() => {
								navigate("/chat" + "/" + item.id);
								clearUserBadge(userId, item.id);
								setSelectId(item.id);
								store.dispatch(setToAvatar(item.avatar as string));
							}}
						>
							<List.Item.Meta
								avatar={
									<Badge size="small" offset={[2, 1]} count={counts.get(item.id)}>
										<Avatar src={item.avatar} size="large" />
									</Badge>
								}
								title={item.nickName}
								description={`${handlerLastMsg(item.lastMsg)}`}
							/>
						</List.Item>
					)}
				/>
			</div>
		</div>
	);
};

export default ChatList;
