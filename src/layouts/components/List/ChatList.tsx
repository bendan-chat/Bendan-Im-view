/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { store } from "@/redux";
import { useNavigate } from "react-router-dom";
import { Account } from "@/api/interface/user";
import { setToAvatar } from "@/redux/modules//chat/action";
import { List, Avatar, Input, Space, Badge } from "antd";
import { PlusSquareTwoTone } from "@ant-design/icons";

import { listChat } from "@/api/modules/chat";
import { splitUrlToFileName } from "@/utils/util";
import { subscribe } from "@/websocket/helper/MyEventEmitter";

import "./ChatList.less";

const ChatList = () => {
	const navigate = useNavigate();
	const [data, setData] = useState<Account.ChatUser[]>([]);
	const { userId } = store.getState().global.userInfo;
	const [selectId, setSelectId] = useState<number>();
	const [searchHidden, setSearchHidden] = useState<boolean>(false);
	const [count, setCount] = useState(0);

	subscribe("wsMsg", (e: any) => {
		console.log("ChatList", e);
	});

	useEffect(() => {
		subscribe("agreeNewFriend", () => {
			loadChatList();
		});
	}, []);

	useEffect(() => {
		loadChatList();
	}, []);

	/**
	 * 加载聊天列表
	 */
	function loadChatList() {
		listChat(userId).then(res => {
			if (res.success) {
				setData(res.data);
			}
		});
	}

	/**
	 * 聊天消息处理
	 * @param item
	 */
	function HandlerLastMsg(item: Account.ChatUser) {
		// * 0文本，1图片，2语音，3视频 , 4文件
		let msg: string;
		const msgTemp = splitUrlToFileName(item.lastMsg);
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
				return "[视频]";
			case "jpg":
				return "[图片]";
			case "png":
				return "[图片]";
			case "gif":
				return "[图片]";
			default:
				return "[文件]" + msgTemp;
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

	return (
		<div>
			<div className="search-friend-class">
				<Space>
					<Input size="small" placeholder="搜索" allowClear onClick={onSearch} onBlur={onBlur} />
					<PlusSquareTwoTone onClick={ClickGroupChat} style={{ fontSize: "30px" }} />
				</Space>
			</div>
			<div hidden={searchHidden} className="chatList-cha">
				<List
					itemLayout="horizontal"
					dataSource={data}
					renderItem={item => (
						<List.Item
							className={`${selectId === item.id ? "active-user" : ""}`}
							onClick={() => {
								navigate("/chat" + "/" + item.id);
								setSelectId(item.id);
								store.dispatch(setToAvatar(item.avatar as string));
							}}
						>
							<List.Item.Meta
								className="index"
								avatar={
									<Badge size="small" offset={[2, 2]} count={5}>
										<Avatar src={item.avatar} size="large" />
									</Badge>
								}
								title={item.nickName}
								description={HandlerLastMsg(item)}
							/>
						</List.Item>
					)}
				/>
			</div>
		</div>
	);
};

export default ChatList;
