import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "@/redux";
import { Account } from "@/api/interface/user";
import { List, Avatar, Space, Button, Badge, AutoComplete } from "antd";
import { FriendParams, getFriends } from "@/api/modules/user";
import { UserAddOutlined } from "@ant-design/icons";
import { AddFriend } from "./components/AddFriend";
import { subscribe } from "@/websocket/helper/MyEvent";

import "./FriendList.less";

const FriendList = () => {
	interface ModalProps {
		showModal: () => void;
	}

	const [friends, setFriends] = useState<Account.ChatUser[]>([]);
	const [selectId, setSelectId] = useState<number>();
	const [options, setOptions] = useState<{ label: JSX.Element }[]>([]);
	const [count, setCount] = useState(0);

	const { username } = store.getState().global.userInfo;
	const addFriendRef = useRef<ModalProps>(null);
	const navigate = useNavigate();

	useEffect(() => {
		loadFriends(username);
	}, []);

	useEffect(() => {
		subscribe("addNewFriend", () => {
			setCount(count + 1);
		});
	}, []);

	useEffect(() => {
		subscribe("newFriendBadge", () => {
			setCount(count + 1);
		});
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
				setFriends(res.data);
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
	function onSearch(value: string) {
		let res: { label: JSX.Element }[] = [];
		if (!value) {
			res = [];
		} else {
			let filter = friends
				.filter(v => {
					if (v.nickName?.includes(value)) {
						return v;
					}
				})
				.map(item => {
					return {
						label: (
							<>
								<List.Item
									className={`${selectId === item.id ? "active-user" : ""}`}
									onClick={() => {
										navigate("/friend" + "/" + item.id);
										setSelectId(item.id);
									}}
								>
									<List.Item.Meta className="index" avatar={<Avatar src={item.avatar} size="large" />} title={item.nickName} />
								</List.Item>
							</>
						)
					};
				});
			res = filter;
		}
		setOptions(res);
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
					<AutoComplete
						allowClear={true}
						style={{ width: 160 }}
						onSearch={onSearch}
						placeholder="搜索聊天好友......"
						options={options}
					/>
					<Button onClick={addUser} type="primary" shape="circle">
						<UserAddOutlined />
					</Button>
					<AddFriend innerRef={addFriendRef} />
				</Space>
			</div>
			<br />
			<div className="friends-chat">
				<div style={{ paddingLeft: "5px" }}>新的朋友</div>
				<div className={`${selectId === -1 ? "active-user-newFriends" : "newFriends"}`} onClick={newFriends}>
					<Badge size="small" offset={[1, 16]} count={count}>
						<Avatar style={{ background: "#fa9d3b", marginTop: "15px" }} src={<UserAddOutlined />} size="large" />
					</Badge>
					<span style={{ marginTop: "24px", marginLeft: "11px" }}>新的朋友</span>
				</div>
				<br />
				<div style={{ paddingLeft: "5px" }}>好友</div>
				<List
					itemLayout="horizontal"
					dataSource={friends}
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
