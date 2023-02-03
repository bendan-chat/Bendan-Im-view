// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Account } from "@/api/interface/user";
import { getFriend } from "@/api/modules/user";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ManOutlined, UserOutlined, WomanOutlined } from "@ant-design/icons";

import "./index.less";
import { store } from "@/redux";
import { setListMatch, setMenuIconKey } from "@/redux/modules/menu/action";
import { setToAvatar } from "@/redux/modules/chat/action";
import { delFriendAndChatRecord } from "@/api/modules/chat";

export default function index() {
	const { id } = useParams();
	const [data, setData] = useState<Account.FriendUser>();
	const { userId } = store.getState().global.userInfo;
	const curId = Number.parseInt(id!);
	const navigate = useNavigate();

	useEffect(() => {
		getFriend(curId).then(res => {
			setData(res.data);
		});
	}, [id]);

	/**
	 * 匹配性别
	 * @param sex
	 * @returns
	 */
	function matchSex(sex: number) {
		switch (sex) {
			case 1:
				return <ManOutlined className="sex-icon" style={{ color: "blue" }} />;
			case -1:
				return <UserOutlined className="sex-icon" />;
			case 0:
				return <WomanOutlined className="sex-icon" style={{ color: "red" }} />;
		}
	}

	/**
	 * 跳转到聊天页面
	 */
	function toChat() {
		store.dispatch(setListMatch(false));
		store.dispatch(setMenuIconKey("11"));
		store.dispatch(setToAvatar(data?.avatar as string));
		navigate("/chat" + "/" + curId);
	}

	/**
	 * 删除好友
	 */
	function delUser() {
		delFriendAndChatRecord(curId, userId).then(res => {
			console.log(res.data);
		});
		navigate("/friends");
		location.reload();
	}
	return (
		<div className="friend-parant">
			<div className="friend-up">
				<img className="friend-up-1" src={data?.avatar as string} />
				<div className="friend-up-2">
					<div className="friend-up-2-up-1">
						<span className="name-font">{"昵称: " + data?.nickName}</span>
						{matchSex(data?.gender as number)}
					</div>
					<div className="friend-up-2-up-2">
						<span className="name-font">{"账号: " + data?.username}</span>
					</div>
				</div>
			</div>
			<div className="friend-down">
				<div className="friend-down-1">
					<Button onClick={toChat} className="btn-css" type="primary" size="large">
						发送消息
					</Button>
				</div>
				<div className="friend-down-2">
					<Button onClick={delUser} className="btn-css" type="primary" size="large" danger>
						删除好友
					</Button>
				</div>
			</div>
		</div>
	);
}
