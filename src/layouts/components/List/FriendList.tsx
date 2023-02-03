import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "@/redux";
import { Account } from "@/api/interface/user";
import { List, Avatar, Input, Space, Button } from "antd";
import { FriendParams, getFriends } from "@/api/modules/user";
import { UserAddOutlined } from "@ant-design/icons";
import { AddFriend } from "./components/AddFriend";

import "./FriendList.less";

const FriendList = () => {
	interface ModalProps {
		showModal: () => void;
	}
	const { username } = store.getState().global.userInfo;
	const addFriendRef = useRef<ModalProps>(null);

	const [data, setData] = useState<Account.ChatUser[]>([]);
	const [search, setSearch] = useState<string>("");
	const [selectId, setSelectId] = useState<number>();
	const [searchHidden, setSearchHidden] = useState<boolean>(false);
	const navigate = useNavigate();
	// * 更新输入框的内容
	const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setSearch(e.target.value);
	};
	useEffect(() => {
		loadFriends(username);
	}, []);

	/**
	 * 加载好友列表
	 *
	 * @param username
	 */
	function loadFriends(username: string) {
		const params: FriendParams = {
			username
		};
		getFriends(params).then(res => {
			if (res.success) {
				setData(res.data);
			}
		});
	}

	/**
	 * 新增 好友
	 */
	function addUser() {
		addFriendRef.current!.showModal();
	}

	/**
	 * 搜索 好友
	 */
	function onSearch() {
		console.log(search);
		setSearchHidden(true);
	}
	/**
	 * 输入框 鼠标移出事件
	 */
	function onBlur() {
		setSearchHidden(false);
	}
	/**
	 * 新的好友点击事情
	 */
	function newFriends() {
		setSelectId(-1);
		navigate("/newFriends");
	}

	return (
		<div>
			<div className="search-friend-class">
				<Space>
					<Input
						onChange={onChange}
						value={search}
						size="small"
						placeholder="搜索"
						allowClear
						onClick={onSearch}
						onBlur={onBlur}
					/>
					<Button onClick={addUser} type="primary" shape="circle">
						<UserAddOutlined />
					</Button>
					<AddFriend innerRef={addFriendRef} />
				</Space>
			</div>
			<br />
			<div hidden={searchHidden} className="friends-chat">
				<div style={{ paddingLeft: "5px" }}>新的朋友</div>
				<div className={`${selectId === -1 ? "active-user-newFriends" : "newFriends"}`} onClick={newFriends}>
					<Avatar style={{ background: "#fa9d3b", marginTop: "15px" }} src={<UserAddOutlined />} size="large" />
					<span style={{ marginTop: "24px", marginLeft: "11px" }}>新的朋友</span>
				</div>
				<br />
				<div style={{ paddingLeft: "5px" }}>好友</div>
				<List
					itemLayout="horizontal"
					dataSource={data}
					renderItem={item => (
						<List.Item
							className={`${selectId === item.id ? "active-user" : ""}`}
							onClick={() => {
								navigate("/friend" + "/" + item.id);
								setSelectId(item.id);
							}}
						>
							<List.Item.Meta className="index" avatar={<Avatar src={item.avatar} size="large" />} title={item.nickName} />
						</List.Item>
					)}
				/>
			</div>
		</div>
	);
};

export default FriendList;
