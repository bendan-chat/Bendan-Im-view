/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Account } from "@/api/interface/user";
import { getFriend } from "@/api/modules/user";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ManOutlined, UserOutlined, WomanOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

import { store } from "@/redux";
import { setListMatch, setMenuIconKey } from "@/redux/modules/menu/action";
import { setToAvatar } from "@/redux/modules/chat/action";
import { delFriendAndChatRecord } from "@/api/modules/chat";

import "./index.less";
import { message, Modal } from "antd";

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
				return " 男";
			case -1:
				return " 未知";
			case 0:
				return " 女";
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
		Modal.confirm({
			title: "温馨提示 🧡",
			icon: <ExclamationCircleOutlined />,
			content: "是否确认删除好友？",
			okText: "确认",
			cancelText: "取消",
			onOk: () => {
				message.success("删除好友成功！");
				delFriendAndChatRecord(curId, userId).then(res => {
					console.log(res.data);
				});
				navigate("/friends");
				location.reload();
			}
		});
	}
	return (
		<div className="friend-parant">
			<div className="friend-card">
				<div className="photo">
					<img src={data?.avatar as string} />
				</div>
				<h1 style={{ fontSize: "35px", color: "#ffffff" }}>{`${data?.nickName}`}</h1>
				<h2 style={{ fontSize: "20px", color: "#ffffff" }}>{`账号： ${data?.username}`}</h2>
				<p>
					<UserOutlined className="sex-icon" /> {"  " + matchSex(data?.gender as number)}
				</p>
				<p className="friend-self-des">{`${data?.selfDescription}`}</p>
				<div className="friend-down">
					<a className="friend-down-send" onClick={toChat}>
						发送消息
					</a>
					<a className="friend-down-del" style={{ color: "red" }} onClick={delUser}>
						删除好友
					</a>
				</div>
			</div>
		</div>
	);
}
