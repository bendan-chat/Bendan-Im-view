import "./chat.less";
import ChatBottomSend from "./msg/ChatBottomSend";
import ChatLeftMsg from "./msg/ChatLeftMsg";
import ChatRightMsg from "./msg/ChatRightMsg";
import { useLocation } from "react-router";
import { useState } from "react";

const ChatRoom = () => {
	const location = useLocation();
	const toId: number = Number.parseInt(location.pathname.split("/", 3)[2]);
	const [msgList, setMsgList] = useState<JSX.Element[]>([]);
	// const msgList: JSX.Element[] = [];
	// 加载之前聊天记录
	for (let i = 2; i < 10; i++) {
		msgList.push(<ChatLeftMsg key={msgList.length + 1} msg="qqqqqqq" />);
		msgList.push(<ChatRightMsg key={msgList.length + 1} msg="ggggggg" />);
	}

	const addSelfMsg = (msg: string) => {
		msgList.push(<ChatRightMsg key={msgList.length + 1} msg={msg} />);
		console.log(msgList);
		setMsgList(msgList);
	};
	return (
		<>
			<div className="cr">
				<div className="message-container">{msgList}</div>
				<div className="chatFooter">
					<ChatBottomSend addMsgList={addSelfMsg} toId={toId} />
				</div>
			</div>
		</>
	);
};

export default ChatRoom;
