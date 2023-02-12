/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { store } from "@/redux";
import { useNavigate } from "react-router-dom";
import { Account } from "@/api/interface/user";
import { setToAvatar } from "@/redux/modules//chat/action";
import { List, Avatar, Input, Space, Badge } from "antd";
import { PlusSquareTwoTone } from "@ant-design/icons";

import { clearUnreadChatMsg, getUnreadChatList, listChat } from "@/api/modules/chat";
import { splitUrlToFileName } from "@/utils/util";
import { subscribe } from "@/websocket/helper/MyEventEmitter";

import "./ChatList.less";

const ChatList = () => {
	const navigate = useNavigate();
	const [chatUsers, setChatUsers] = useState<Account.ChatUser[]>([]);
	const { userId } = store.getState().global.userInfo;
	const [lastMsg, setLastMsg] = useState<Map<number, string>>(new Map<number, string>());
	// const [lastMsg, setLastMsg] = useState<Map<number, string>>(new Map<number, string>());
	const [selectId, setSelectId] = useState<number>();
	const [searchHidden, setSearchHidden] = useState<boolean>(false);
	const [counts, setCounts] = useState<Map<number, number>>(new Map<number, number>());

	/**
	 * 捕获ws消息 处理成微标
	 */
	subscribe("wsMsg", (e: any) => {
		let fromId = Number.parseInt(e.detail.fromId);
		let toId = Number.parseInt(e.detail.toId);
		let lastMsg = e.detail.sendContent as string;
		console.log(toId + ":" + lastMsg);
		handlerBadgeByfromId(fromId);
		// handlerLastMsg(lastMsg, toId);
	});

	/**
	 * 清空微标
	 */
	useEffect(() => {
		subscribe("clearUnreadMsg", (e: any) => {
			const { fromId, toId } = e.detail;
			let fromIdNum = Number.parseInt(fromId);
			let toIdNum = Number.parseInt(toId);
			if (!Number.isNaN(fromIdNum) && !Number.isNaN(toIdNum)) {
				clearUserBadge(fromIdNum, toIdNum);
			}
		});
	}, []);

	/**
	 * 捕获新增好友消息 然后更新
	 */
	useEffect(() => {
		subscribe("agreeNewFriend", () => {
			loadChatList();
		});
	}, []);

	/**
	 * 初始加载聊天聊表
	 */
	useEffect(() => {
		loadChatList();
		loadUnreadChatList();
	}, []);

	/**
	 * 聊天消息处理
	 * @param item
	 */
	function handlerLastMsg(lastMsgArg: string, userId: number) {
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
				lastMsg.set(userId, msgTemp.length > 10 ? msgTemp.substring(0, 10) + "......" : msgTemp);
				break;
			case "wav":
				lastMsg.set(userId, "[语音]");
				break;
			case "mp4":
				lastMsg.set(userId, "[视频]" + msgTemp);
				break;
			case "gif" || "png" || "jpg":
				lastMsg.set(userId, "[图片]" + msgTemp);
				break;
			default:
				lastMsg.set(userId, "[文件]" + msgTemp);
				break;
		}
	}

	/**
	 * 加载聊天列表
	 */
	async function loadChatList() {
		const { data } = await listChat(userId);
		setChatUsers(data);
		data.forEach((v, i) => {
			handlerLastMsg(v.lastMsg, v.id);
		});
		setLastMsg(lastMsg);
	}

	/**
	 * 查询未读聊天记录
	 */
	async function loadUnreadChatList() {
		const { data } = await getUnreadChatList(userId);
		data.map((value, index) => {
			let fromId = value.fromId;
			handlerBadgeByfromId(fromId);
		});
	}

	/**
	 * 处理微标数
	 * @param fromId
	 */
	function handlerBadgeByfromId(fromId: number) {
		if (counts.has(fromId)) {
			counts.set(fromId, counts.get(fromId)! + 1);
			setCounts(counts => {
				return counts;
			});
		} else {
			counts.set(fromId, 1);
			setCounts(counts => {
				return counts;
			});
		}
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
		if (counts.has(toId)) {
			counts.delete(toId);
			setCounts(counts);
			clearUnreadChatMsg(userId, toId);
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
									<Badge size="small" offset={[2, 1]} count={counts.get(item.id)}>
										<Avatar src={item.avatar} size="large" />
									</Badge>
								}
								title={item.nickName}
								description={`${lastMsg.get(item.id)}`}
							/>
						</List.Item>
					)}
				/>
			</div>
		</div>
	);
};

export default ChatList;
