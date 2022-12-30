import React, { useState } from "react";
import { Input, Button } from "antd";
import { sendMessage, SendMessageProps } from "@/websocket";
import { SendCode } from "@/websocket/type";
import { store } from "@/redux";

// import ChatRightMsg from "./ChatRightMsg";
const { TextArea } = Input;

interface IProps {
	addMsgList: any;
	toId: number;
}
// eslint-disable-next-line react/prop-types
export default function ChatBottomSend({ toId, addMsgList }: IProps) {
	const { userId } = store.getState().global.userInfo;
	const [msg, setMsg] = useState<string>("");
	const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setMsg(e.target.value);
	};
	const sendMsgClick = () => {
		const msgObj: SendMessageProps = {
			code: SendCode.MESSAGE,
			sendType: 0,
			fromId: userId,
			toId: toId,
			sendContent: msg
		};
		// 发送到后台
		sendMessage(msgObj);
		// 前台展示
		addMsgList(msgObj, true);
		setMsg("");
	};
	return (
		<div className="footer-body">
			<TextArea
				value={msg}
				className="textArea"
				style={{ height: 150 }}
				placeholder="textarea with clear icon"
				allowClear
				onChange={onChange}
			/>
			<Button onClick={sendMsgClick} type="primary" className="right-bottom-btn">
				发送
			</Button>
		</div>
	);
}
