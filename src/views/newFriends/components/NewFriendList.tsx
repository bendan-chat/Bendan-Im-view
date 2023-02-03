import { Chat } from "@/api/interface/chat";
import { agreeAddNewFriend } from "@/api/modules/chat";
import { Avatar, Button, message } from "antd";
import React from "react";

import "./NewFriendList.less";

interface IProps {
	newFriend: Chat.NewFriendList;
}

export default function NewFriendList({ newFriend }: IProps) {
	/**
	 * 添加按钮点击事情
	 */
	function addFriend() {
		agreeAddNewFriend(newFriend.id!).then(res => {
			if (res.success) {
				message.success("添加成功");
			}
		});
	}
	return (
		<div className="newFriendList-parent">
			<Avatar size={50} src={newFriend.avatar} />
			<div className="newFriendList-text">
				<div className="newFriendList-nickname">{newFriend.nickname}</div>
				<div className="newFriendList-des">{newFriend.description}</div>
			</div>
			<div className="newFriendList-btn"></div>
			{newFriend.status == 1 ? (
				<Button
					className="newFriendList-btn-add"
					style={{ background: "#1aad19" }}
					type="primary"
					key={"addFriend"}
					onClick={addFriend}
				>
					添加
				</Button>
			) : (
				<div className="newFriendList-btn-added">已添加</div>
			)}
		</div>
	);
}
