/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { store } from "@/redux";
import { Input, Button, Tooltip } from "antd";
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
	const [sendStattus, setSendStattus] = useState<boolean>(false);
	const inputRef = React.createRef<HTMLInputElement>();

	// * 更新输入框的内容
	const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		let v = e.target.value;
		if (v == "") {
			setSendStattus(false);
		}
		setMsg(v);
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
		if (text == null || text == undefined || text!.match(/^\s+$/) != null || text == "") {
			setSendStattus(true);
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
					className={sendStattus ? "textArea-bottom" : ""}
					style={{ height: 150 }}
					allowClear
					onChange={onChange}
					onClick={() => {
						setSendStattus(false);
					}}
					ref={inputRef}
					onPressEnter={sendMsgClick}
				/>
				<Tooltip placement="topRight" title={"不能发送空白消息"} open={sendStattus}>
					<Button onClick={sendMsgClick} type="primary" className="right-send-btn">
						发送
					</Button>
				</Tooltip>

				<ChatAudioButton className="left-voice-btn" addMsgList={addMsgList} toId={toId} />
			</div>
		</div>
	);
}
