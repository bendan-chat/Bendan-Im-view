import React, { useEffect, useState } from "react";
import { store } from "@/redux";
import { Input, Button } from "antd";
import { SmileTwoTone, PhoneTwoTone, FolderTwoTone } from "@ant-design/icons";
import { sendMessage, SendMessageProps } from "@/websocket";
import { SendCode } from "@/websocket/type";
import ChatAudioButton from "./ChatAudioButton";
import { Message } from "@/api/interface/chat";
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
		if (msgObj.sendContent === null || msgObj.sendContent === undefined || msgObj.sendContent === "") {
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
	const emjoyClick = () => {
		console.log("emjoyClick");
	};
	const fileClick = () => {
		console.log("fileClick");
	};
	const phoneClick = () => {
		console.log("phoneClick");
	};

	return (
		<div className="footer-body">
			<div className="multi-div">
				<SmileTwoTone onClick={emjoyClick} className="emjoy-left-icon" />
				<FolderTwoTone onClick={fileClick} className="file-left-icon" />
				<PhoneTwoTone onClick={phoneClick} className="phone-right-icon" />
			</div>
			<div className="input-edge-div">
				<TextArea
					bordered={false}
					status={sendStattus ? "" : "warning"}
					value={msg}
					className="textArea"
					style={{ height: 150 }}
					placeholder=""
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
