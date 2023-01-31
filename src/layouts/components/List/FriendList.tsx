/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "@/redux";
import { Account } from "@/api/interface/user";
import { List, Avatar, Input, Space, Button, Dropdown, MenuProps } from "antd";
import { FriendParams, getFriends } from "@/api/modules/user";
import { UserAddOutlined } from "@ant-design/icons";
import { AddFriend } from "./components/AddFriend";

import "./FriendList.less";
import FriendItem from "./components/FriendItem";

const FriendList = () => {
	interface ModalProps {
		showModal: (params: { name: number }) => void;
	}
	const addFriendRef = useRef<ModalProps>(null);
	const [data, setData] = useState<Account.ChatUser[]>([]);
	const { username } = store.getState().global.userInfo;
	const [searchHidden, setSearchHidden] = useState<boolean>(false);
	const navigate = useNavigate();
	useEffect(() => {
		loadFriends(username);
	}, []);

	/**
	 * 加载好友列表
	 *
	 * @param username
	 */
	async function loadFriends(username: string) {
		const params: FriendParams = {
			username
		};
		const { data } = await getFriends(params);
		setData(data);
	}

	/**
	 * 新增 好友
	 */
	function addUser() {
		addFriendRef.current!.showModal({ name: 11 });
	}

	/**
	 * 搜索 好友
	 */
	function onSearch() {
		setSearchHidden(true);
	}
	/**
	 * 输入框 鼠标移出事件
	 */
	function onBlur() {
		setSearchHidden(false);
	}
	/**
	 * 新好友点击事情
	 */
	function newFriends() {
		navigate("/newFriends");
		console.log("newFriends");
	}

	const items: MenuProps["items"] = [
		{
			label: "1st menu item",
			key: "1"
		},
		{
			label: "2nd menu item",
			key: "2"
		},
		{
			label: "3rd menu item",
			key: "3"
		}
	];

	return (
		<div>
			<div className="search-friend-class">
				<Space>
					<Input size="small" placeholder="搜索" allowClear onClick={onSearch} onBlur={onBlur} />
					<Button onClick={addUser} type="primary" shape="circle">
						<UserAddOutlined />
					</Button>
					<AddFriend innerRef={addFriendRef} />
				</Space>
			</div>
			<br />
			<div hidden={searchHidden} className="friends-chat">
				<div style={{ paddingLeft: "5px" }}>新的朋友</div>
				<div className="newFriends" onClick={newFriends}>
					<Avatar style={{ background: "#fa9d3b", marginTop: "15px" }} src={<UserAddOutlined />} size="large" />
					<span style={{ marginTop: "24px", marginLeft: "11px" }}>新的朋友</span>
				</div>
				<br />
				<div style={{ paddingLeft: "5px" }}>好友</div>
				<Dropdown menu={{ items }} trigger={["contextMenu"]}>
					<List
						itemLayout="horizontal"
						dataSource={data}
						renderItem={item => (
							<List.Item
								className={""}
								onClick={() => {
									navigate("/friend" + "/" + item.id);
								}}
							>
								<List.Item.Meta className="index" avatar={<Avatar src={item.avatar} size="large" />} title={item.nickName} />
							</List.Item>
						)}
					/>
				</Dropdown>
			</div>
		</div>
	);
};

export default FriendList;