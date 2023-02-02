import React from "react";
import { Avatar, Button, List } from "antd";
import "./index.less";

export default function index() {
	const data = [
		{
			title: "Ant Design Title 1"
		},
		{
			title: "Ant Design Title 2"
		},
		{
			title: "Ant Design Title 3"
		},
		{
			title: "Ant Design Title 4"
		}
	];

	function addFriend() {
		console.log("addFriend");
	}
	return (
		<div className="new-friend-parent">
			<div className="new-friend-title">新的朋友</div>
			<List
				className="new-friend-list"
				itemLayout="horizontal"
				dataSource={data}
				renderItem={item => (
					<List.Item
						actions={[
							<Button style={{ background: "#1aad19" }} type="primary" key={"addFriend"} onClick={addFriend}>
								添加
							</Button>
						]}
					>
						<List.Item.Meta
							avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
							title={<a href="https://ant.design">{item.title}</a>}
							description="Ant Design, a design language for background applications, is refined by Ant UED Team"
						/>
					</List.Item>
				)}
			/>
		</div>
	);
}
