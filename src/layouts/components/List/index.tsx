import { useEffect, useState } from "react";
import { store } from "@/redux";
import { useNavigate } from "react-router-dom";
import { Account } from "@/api/interface/user";
import { setToAvatar } from "@/redux/modules//chat/action";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { List, Avatar, Input, Space, Button, Skeleton, Divider } from "antd";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import InfiniteScroll from "react-infinite-scroll-component";
import { FriendParams, getFriends } from "@/api/modules/user";
import { UserAddOutlined } from "@ant-design/icons";

import "./index.less";
import { ChatPage, listChat } from "@/api/modules/chat";

interface IProps {
	onChatList: boolean;
}

const FriendList = ({ onChatList }: IProps) => {
	const navigate = useNavigate();
	const [data, setData] = useState<Account.ChatUser[]>([]);
	const { username } = store.getState().global.userInfo;
	const [selectId, setSelectId] = useState<number>();
	const [searchHidden, setSearchHidden] = useState<boolean>(false);

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
	 * 加载聊天列表
	 *
	 * @param username
	 */
	async function loadChatList(username: string) {
		const params: ChatPage = {
			cur: 1,
			limit: 100,
			order: true,
			username: username
		};
		const { data } = await listChat(params);
		setData(data);
	}
	// useEffect(() => {
	// 	loadChatList(username);
	// }, []);

	useEffect(() => {
		if (onChatList) {
			loadFriends(username);
		} else {
			loadChatList(username);
		}
	}, [onChatList]);

	// 懒加载好友
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const loadMoreData = () => {
		const params: FriendParams = {
			username
		};
		getFriends(params).then(res => {
			setData([...data, ...res.data]);
		});
	};

	// 新增 好友
	function addUser() {
		console.log("addUser");
	}

	// 搜索 好友
	function onSearch() {
		setSearchHidden(true);
	}
	function onBlur() {
		setSearchHidden(false);
	}
	return (
		<div>
			<div className="search-friend-class">
				<Space>
					<Input size="small" placeholder="搜索" allowClear onClick={onSearch} onBlur={onBlur} />
					<Button onClick={addUser} type="primary" shape="circle">
						<UserAddOutlined />
					</Button>
				</Space>
			</div>
			<div hidden={searchHidden} className="friends-chat">
				{/* <InfiniteScroll
					dataLength={data.length}
					next={loadMoreData}
					hasMore={data.length < 50}
					loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
					endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
					scrollableTarget="scrollableDiv"
				> */}
				<List
					itemLayout="horizontal"
					dataSource={data}
					renderItem={item => (
						<List.Item
							className={`${selectId === item.id ? "active-user" : ""}`}
							onClick={() => {
								navigate("/chat" + "/" + item.id);
								setSelectId(item.id);
								store.dispatch(setToAvatar(item.avatar as string));
							}}
						>
							<List.Item.Meta
								className="index"
								avatar={<Avatar src={item.avatar} />}
								title={item.nickName}
								description="is refined by Ant UED Team.."
							/>
						</List.Item>
					)}
				/>
				{/* </InfiniteScroll> */}
			</div>
		</div>
	);
};

export default FriendList;
