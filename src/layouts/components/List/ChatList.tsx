/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { store } from "@/redux";
import { useNavigate } from "react-router-dom";
import { Account } from "@/api/interface/user";
import { List, Avatar, Input, Space, Badge } from "antd";
import { PlusSquareTwoTone } from "@ant-design/icons";

import { clearUnreadChatMsg, getUnreadChatList, listChat } from "@/api/modules/chat";
import { splitUrlToFileName } from "@/utils/util";
import { subscribe, unsubscribe } from "@/websocket/helper/MyEvent";

import "./ChatList.less";
import { setToAvatar } from "@/redux/modules/chat/action";

const ChatList = () => {
	const [chatUsers, setChatUsers] = useState<Account.ChatUser[]>([]);
	const [selectId, setSelectId] = useState<number>();
	const [searchHidden, setSearchHidden] = useState<boolean>(false);
	const [counts, setCounts] = useState<number[]>([0, 1, 3]);
	const [flag, setFlag] = useState<number>(0);

	const navigate = useNavigate();
	const { userId } = store.getState().global.userInfo;

	window.onbeforeunload = function () {
		console.log();
	};
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
	 * 加载聊天列表
	 */
	async function loadChatList() {
		const { data } = await listChat(userId);
		// setCounts(new Array(data.length).fill(0));
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
		// let v = margeKv(fromId, 1);
		// let countMix = getItemById(fromId, userCounts);
		// if (countMix != undefined && countMix.length > 0) {
		// 	let index = userCounts.indexOf(countMix);
		// 	let { id, count } = partKv(countMix);
		// 	userCounts.splice(index, 1, margeKv(id, ++count));
		// } else {
		// 	userCounts.push(v);
		// }
		// setUserCounts(userCounts);
	}

	/**
	 * 搜索 好友
	 */
	function onSearch() {
		setSearchHidden(true);
	}
	function onBlur() {
		setSearchHidden(false);
	}

	/**
	 * 创建群聊
	 */
	function ClickGroupChat() {
		console.log("ClickGroupChat");
	}

	/**
	 * 清除用户微标
	 * @param toId
	 */
	function clearUserBadge(userId: number, toId: number) {
		try {
			console.log();
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div>
			<div className="search-friend-class">
				<Space>
					<Input size="small" placeholder="搜索" allowClear onClick={onSearch} onBlur={onBlur} />
					<PlusSquareTwoTone onClick={ClickGroupChat} style={{ fontSize: "30px" }} />
				</Space>
			</div>
			<div hidden={searchHidden} className="chatList-chat">
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
								className="index"
								avatar={
									<Badge size="small" offset={[2, 1]} count={counts[flag + 1]}>
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
