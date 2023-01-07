import { Avatar } from "antd";
import React from "react";

interface IProps {
	src: string;
	len: number;
	avatar: string;
}

export default function ChatRightVoiceMsg({ src, avatar, len }: IProps) {
	return (
		<>
			<div className="ri">
				<div className="ri-message-box">{len + " s"}</div>
				<Avatar shape="square" src={avatar} />
				<audio hidden src={src}></audio>
			</div>
		</>
	);
}
