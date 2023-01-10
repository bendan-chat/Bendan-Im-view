import ChatBottomSend from "./send/ChatBottomSend";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { listRecord, RecordPage } from "@/api/modules/chat";
import { store } from "@/redux";

import ChatRightMsg from "./msg/ChatRightMsg";
import ChatLeftMsg from "./msg/ChatLeftMsg";
import { SendMessageProps, ws } from "@/websocket";
import "./chat.less";

const ChatRoom = () => {
	const { avatar } = store.getState().global.userInfo;
	const { userId } = store.getState().global.userInfo;
	const { toAvatar } = store.getState().chat;

	const { id } = useParams();
	const toId: number = Number.parseInt(id!);
	const [msgList, setMsgList] = useState<any[]>([]);

	useEffect(() => {
		// 加载之前聊天记录
		const params: RecordPage = {
			cur: 1,
			limit: 1000,
			orderField: "",
			order: false,
			userId: userId,
			toId: Number.parseInt(id!)
		};

		listRecord(params).then(function (response) {
			setMsgList(response.data.items);
			document.getElementsByClassName("message-container")[0].scrollTop =
				document.getElementsByClassName("message-container")[0].scrollHeight;
		});
	}, [id]);

	// 动态加载消息时候滚动条也要沉低
	useEffect(() => {
		document.getElementsByClassName("message-container")[0].scrollTop =
			document.getElementsByClassName("message-container")[0].scrollHeight;
	}, [msgList]);
	ws!.onmessage = function (event) {
		handleMsg(event);
	};
	const handleMsg = (event: MessageEvent<any>) => {
		const result = JSON.parse(event.data as string);
		// * 处理心跳
		if (result === 2) {
			console.log();
		} else {
			addSelfMsg(result);
		}
	};

	// * 更新消息
	const addSelfMsg = (msg: SendMessageProps) => {
		const temp = [...msgList];
		temp.push(msg);
		setMsgList(temp);
	};
	return (
		<>
			<div className="cr">
				<div className="message-container">
					{msgList.map((item, index) => {
						if (item.fromId === userId) {
							return <ChatRightMsg avatar={avatar} key={index} msg={item.sendContent} />;
						} else {
							return <ChatLeftMsg avatar={toAvatar} key={index} msg={item.sendContent} />;
						}
					})}
				</div>
				<div className="chatFooter">
					<ChatBottomSend addMsgList={addSelfMsg} toId={toId} />
				</div>
			</div>
		</>
	);
};

export default ChatRoom;
