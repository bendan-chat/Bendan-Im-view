import React, { useState } from "react";
import { Input, Button } from "antd";
import { sendMessage, SendMessageProps } from "@/websocket";
import { SendCode } from "@/websocket/type";
import { store } from "@/redux";
import ChatAudioMsg from "./ChatAudioMsg";
const { TextArea } = Input;

interface IProps {
	addMsgList: any;
	toId: number;
}
export default function ChatBottomSend({ toId, addMsgList }: IProps) {
	const { userId } = store.getState().global.userInfo;
	const [msg, setMsg] = useState<string>("");
	const [sendStattus, setSendStattus] = useState<boolean>(true);

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
		if (msgObj.sendContent === null || msgObj.sendContent === undefined || msgObj.sendContent === "") {
			setSendStattus(false);
			return;
		} else {
			// 发送到后台
			sendMessage(msgObj);
			// 前台展示
			addMsgList(msgObj, true);
			setMsg("");
		}
	};
	return (
		<div className="footer-body">
			<TextArea
				status={sendStattus ? "" : "warning"}
				value={msg}
				className="textArea"
				style={{ height: 150 }}
				placeholder="请输入内容......"
				allowClear
				onChange={onChange}
				onClick={() => {
					setSendStattus(true);
				}}
				onPressEnter={sendMsgClick}
			/>
			<Button onClick={sendMsgClick} type="primary" className="right-bottom-btn">
				发送
			</Button>
			<ChatAudioMsg />
		</div>
	);
}
