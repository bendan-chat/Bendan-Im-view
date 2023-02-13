/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { store } from "@/redux";
import { Input, Button } from "antd";
import { sendMessage } from "@/websocket";
import { SendCode, SendMessageProps } from "@/websocket/type";
import ChatAudioButton from "./ChatAudioButton";
import { Message } from "@/api/interface/chat";
import EmjoyIcon from "./icon/EmjoyIcon";
import FileUploadIcon from "./icon/FileUploadIcon";
import PhoneIcon from "./icon/PhoneIcon";
const { TextArea } = Input;

interface IProps {
	addMsgList: (msg: SendMessageProps) => void;
	toId: number;
}
export default function ChatBottomSend({ toId, addMsgList }: IProps) {
	const { userId } = store.getState().global.userInfo;
	const [msg, setMsg] = useState<string>("");
	const [sendStattus, setSendStattus] = useState<boolean>(true);
	const inputRef = React.createRef<HTMLInputElement>();

	// * 更新输入框的内容
	const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setMsg(e.target.value);
	};

	// * 发送消息 点击事件
	const sendMsgClick = () => {
		const msgObj: SendMessageProps = {
			code: SendCode.MESSAGE,
			sendType: Message.MsgType.strMsg,
			fromId: userId,
			toId: toId,
			sendContent: msg
		};
		let text = msgObj.sendContent;
		console.log("text", msgObj);
		if (text == null || text == undefined || text!.match(/^\s+$/) != null) {
			setSendStattus(false);
			return;
		} else {
			// 发送到后台
			sendMessage(msgObj);
			// 前台展示
			addMsgList(msgObj);
			setMsg("");
		}
	};

	// * focus 在输入
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	return (
		<div className="footer-body">
			<div className="multi-div">
				<EmjoyIcon />
				<FileUploadIcon addMsgList={addMsgList} toId={toId} />
				<PhoneIcon />
			</div>
			<div className="input-edge-div">
				<TextArea
					value={msg}
					className="textArea"
					style={{ height: 150 }}
					allowClear
					onChange={onChange}
					onClick={() => {
						setSendStattus(true);
					}}
					ref={inputRef}
					onPressEnter={sendMsgClick}
				/>
				<Button onClick={sendMsgClick} type="primary" className="right-send-btn">
					发送
				</Button>
				<ChatAudioButton className="left-voice-btn" addMsgList={addMsgList} toId={toId} />
			</div>
		</div>
	);
}
