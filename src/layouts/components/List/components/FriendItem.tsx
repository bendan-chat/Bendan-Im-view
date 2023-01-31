import React from "react";
import { Avatar } from "antd";

interface IProps {
	src: string;
	nickName: string;
}

export default function FriendItem({ src, nickName }: IProps) {
	return (
		<>
			<div className="newFriends">
				<Avatar style={{ marginTop: "15px" }} src={src} size="large" />
				<span style={{ marginTop: "24px", marginLeft: "11px" }}>{nickName}</span>
			</div>
		</>
	);
}
