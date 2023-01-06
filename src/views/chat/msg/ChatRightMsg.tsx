import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";

interface IProps {
	msg: string;
	avatar: string;
}

export default function ChatRightMsg({ msg }: IProps) {
	return (
		<>
			<div className="ri">
				<div className="ri-message-box">{msg}</div>
				<Avatar shape="square" icon={<UserOutlined />} />
			</div>
		</>
	);
}
