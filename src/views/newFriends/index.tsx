import React, { useEffect, useState } from "react";
import { store } from "@/redux";
// import { Avatar, Button, List } from "antd";
import "./index.less";
import { getNewFriends } from "@/api/modules/chat";
import { Chat } from "@/api/interface/chat";
import NewFriendList from "./components/NewFriendList";

export default function index() {
	const [data, setData] = useState<Chat.NewFriendList[]>();
	const { userId } = store.getState().global.userInfo;
	useEffect(() => {
		getNewFriends(userId).then(res => {
			if (res.success) {
				setData(res.data);
			}
		});
	}, []);

	return (
		<div className="new-friend-parent">
			<div className="new-friend-title">新的朋友</div>
			<div className="new-friend-list-add">
				{data?.map(item => {
					return <NewFriendList key={item.id} newFriend={item} />;
				})}
			</div>
		</div>
	);
}
