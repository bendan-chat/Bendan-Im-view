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

	/**
	 * 添加按钮点击事情
	 */
	// function addFriend() {
	// 	console.log("addFriend");
	// }
	return (
		<div className="new-friend-parent">
			<div className="new-friend-title">新的朋友</div>
			{data?.map((item, index) => {
				return <NewFriendList key={index} newFriend={item} />;
			})}
			{/* <List
				className="new-friend-list"
				itemLayout="horizontal"
				dataSource={data}
				renderItem={item => (
					<List.Item
						actions={[
							item.status == 2 ? (
								<Button style={{ background: "#1aad19" }} type="primary" key={"addFriend"} onClick={addFriend}>
									添加
								</Button>
							) : (
								<div className="btn-added">已添加</div>
							)
						]}
					>
						<List.Item.Meta avatar={<Avatar src={item.avatar} />} title={item.nickname} description={item.description} />
					</List.Item>
				)}
			/> */}
		</div>
	);
}
