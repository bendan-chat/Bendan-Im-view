import { Avatar } from "antd";
import React from "react";

interface IProps {
	msg: string;
	avatar: string;
}

export default function ChatRightMsg({ msg, avatar }: IProps) {
	return (
		<>
			<div className="ri">
				<div className="ri-message-box">{msg}</div>
				<Avatar shape="square" src={avatar} />
			</div>
		</>
	);
}
