import React, { useState } from "react";
import { Input, Button } from "antd";
const { TextArea } = Input;

export default function ChatBottomSend() {
	const [msg, setMsg] = useState<string | number | readonly string[] | undefined>("");
	const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setMsg(e.target.value);
	};
	const sendMsgClick = () => {
		// 前台展示
		// 发送到后台
		console.log(msg);
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
