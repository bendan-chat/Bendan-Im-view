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
	const [msg, setMsg] = useState<string>("");
	const [sendStatus, setSendStatus] = useState<boolean>(false);

	const { userId } = store.getState().global.userInfo;
	const inputRef = React.createRef<HTMLInputElement>();
	// * focus 在输入
	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	/**
	 * 清除回车输入时还会输入回车
	 */
	useEffect(() => {
		setMsg(msg);
	}, [msg]);

	// * 更新输入框的内容
	const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		let text = e.target.value;
		if (text != "\n") {
			setMsg(text);
		}
	};

	/**
	 * 输入异常 提示展示
	 */
	function showInputStatus() {
		setSendStatus(true);
		setTimeout(() => {
			setSendStatus(false);
		}, 2000);
	}

	// * 发送消息 点击事件
	const sendMsgClick = () => {
		let text = msg;
		if (text == null || text == undefined || text!.match(/^\s+$/) != null || text == "") {
			showInputStatus();
			setMsg("");
			return;
		} else {
			const msgObj: SendMessageProps = {
				code: SendCode.MESSAGE,
				sendType: Message.MsgType.strMsg,
				fromId: userId,
				toId: toId,
				sendContent: msg
			};
			// 发送到后台
			sendMessage(msgObj);
			// 前台展示
			addMsgList(msgObj);
		}
		setMsg("");
	};

	return (
		<div className="footer-body">
			<div className="multi-div">
				<EmjoyIcon setMsg={setMsg} />
				<FileUploadIcon addMsgList={addMsgList} toId={toId} />
				<PhoneIcon />
			</div>
			<div className="input-edge-div">
				<TextArea
					value={msg}
					className={sendStatus ? "textArea-bottom" : ""}
					style={{ height: 150 }}
					allowClear
					onChange={onChange}
					onClick={() => {
						setSendStatus(false);
					}}
					ref={inputRef}
					onPressEnter={sendMsgClick}
				/>
				<Tooltip placement="topRight" title={"不能发送空白消息"} open={sendStatus}>
					<Button onClick={sendMsgClick} type="primary" className="right-send-btn">
						发送
					</Button>
				</Tooltip>

				<ChatAudioButton className="left-voice-btn" addMsgList={addMsgList} toId={toId} />
			</div>
		</div>
	);
}
