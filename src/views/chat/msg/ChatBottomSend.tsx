import React, { useState } from "react";
import { Input, Button } from "antd";
import { sendMessage } from "@/websocket";
import { SendCode } from "@/websocket/type";
// import ChatRightMsg from "./ChatRightMsg";
const { TextArea } = Input;

interface IProps {
	addMsgList: any;
	toId: number;
}
// eslint-disable-next-line react/prop-types
export default function ChatBottomSend({ toId, addMsgList }: IProps) {
	const [msg, setMsg] = useState<string>("");
	const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setMsg(e.target.value);
	};
	const sendMsgClick = () => {
		// 发送到后台
		sendMessage({
			code: SendCode.MESSAGE,
			sendType: 0,
			fromId: 2,
			toId: toId,
			content: msg
		});
		// 前台展示
		addMsgList(msg);
		setMsg("");
	};
	return (
		<>
			<Input.Group compact>
				<TextArea
					value={msg}
					className="textArea"
					style={{ height: 150 }}
					placeholder="textarea with clear icon"
					allowClear
					onChange={onChange}
				/>
				<Button onClick={sendMsgClick} type="primary" style={{ float: "right" }}>
					发送
				</Button>
			</Input.Group>
		</>
	);
}
