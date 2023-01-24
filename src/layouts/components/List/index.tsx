import { useEffect, useState } from "react";
import { store } from "@/redux";
import { useNavigate } from "react-router-dom";
import { Account } from "@/api/interface/user";
import { setToAvatar } from "@/redux/modules//chat/action";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { List, Avatar, Input, Space, Button, Badge, Skeleton, Divider } from "antd";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import InfiniteScroll from "react-infinite-scroll-component";
import { FriendParams, getFriends } from "@/api/modules/user";
import { UserAddOutlined } from "@ant-design/icons";

import "./index.less";
import { ChatPage, listChat } from "@/api/modules/chat";
import { splitUrlToFileName } from "@/utils/util";

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

	useEffect(() => {
		if (onChatList) {
			loadFriends(username);
		} else {
			loadChatList(username);
		}
	}, [onChatList]);

	function HandlerLastMsg(item: Account.ChatUser) {
		// * 0文本，1图片，2语音，3视频 , 4文件
		if (onChatList) {
			return "";
		} else {
			let msg: string;
			let msgTemp = splitUrlToFileName(item.lastMsg);
			let msgSplit = msgTemp.split(".");
			if (msgSplit.length == 1) {
				msg = "str";
			} else {
				msg = msgSplit[1];
			}
			switch (msg!) {
				case "str":
					return msgTemp;
				case "wav":
					return "[语音]";
				case "mp4":
					return "[视频]";
				default:
					return "[文件]" + msgTemp;
			}
		}
	}

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
								if (!onChatList) {
									navigate("/chat" + "/" + item.id);
									setSelectId(item.id);
									store.dispatch(setToAvatar(item.avatar as string));
								}
							}}
						>
							<List.Item.Meta
								className="index"
								avatar={
									// <Badge count={1}>
									<Avatar src={item.avatar} size="large" />
									// </Badge>
								}
								title={item.nickName}
								description={HandlerLastMsg(item)}
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
