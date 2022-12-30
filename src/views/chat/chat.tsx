import "./chat.less";
import ChatBottomSend from "./msg/ChatBottomSend";
// import ChatLeftMsg from "./msg/ChatLeftMsg";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { listRecord, RecordPage } from "@/api/modules/chat";
import { store } from "@/redux";

import ChatRightMsg from "./msg/ChatRightMsg";
import ChatLeftMsg from "./msg/ChatLeftMsg";
import { SendMessageProps } from "@/websocket";

const ChatRoom = () => {
	const { id } = useParams();
	const { userId } = store.getState().global.userInfo;
	const [msgList, setMsgList] = useState<any[]>([]);
	const toId: number = Number.parseInt(id!);

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
		});

		// console.log(id);
	}, [id]);

	// // * 更新消息
	const addSelfMsg = (msg: SendMessageProps) => {
		//
		const temp = [...msgList];
		// * 最新的消息
		temp.push(msg);
		setMsgList(temp);
	};

	return (
		<>
			<div className="cr">
				<div className="message-container">
					{msgList.map((item, index) => {
						if (item.fromId === userId) {
							return <ChatRightMsg key={index} msg={item.sendContent} />;
						} else {
							return <ChatLeftMsg key={index} msg={item.sendContent} />;
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
