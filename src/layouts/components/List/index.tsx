import { useEffect, useState } from "react";
import { store } from "@/redux";
import { useNavigate } from "react-router-dom";
import { Account } from "@/api/interface/user";
import { setToAvatar } from "@/redux/modules//chat/action";
import { List, Avatar, Input, Skeleton, Divider } from "antd";
const { Search } = Input;
import { getFriendParams, getFriends } from "@/api/modules/user";
import "./index.less";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

const FriendList = (props: any) => {
	const navigate = useNavigate();
	const { setToAvatar } = props;
	const [data, setData] = useState<Account.ChatUser[]>([]);
	const { username } = store.getState().global.userInfo;
	const [selectId, setSelectId] = useState<number>();

	// 加载好友
	async function loadFriends(username: string) {
		const params: getFriendParams = {
			username
		};
		const { data } = await getFriends(params);
		setData(data);
	}
	useEffect(() => {
		loadFriends(username);
	}, []);

	// 懒加载好友
	const loadMoreData = () => {
		console.log("loadMoreData");
		// const params: getFriendParams = {
		// 	username
		// };
		// getFriends(params).then(res => {
		// 	setData([...data, ...res.data]);
		// });
	};

	// 搜索 好友
	function onSearch() {
		console.log("onSearch");
	}
	return (
		<div>
			<InfiniteScroll
				dataLength={data.length}
				next={loadMoreData}
				hasMore={data.length < 50}
				loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
				endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
				scrollableTarget="scrollableDiv"
			>
				<Search placeholder="input search text" enterButton allowClear onSearch={onSearch} />
				<List
					header={<></>}
					itemLayout="horizontal"
					dataSource={data}
					renderItem={item => (
						<List.Item
							className={`${selectId === item.id ? "active-user" : ""}`}
							onClick={() => {
								navigate("/chat" + "/" + item.id);
								setSelectId(item.id);
								setToAvatar(item.avatar);
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
			</InfiniteScroll>
		</div>
	);
};

const mapDispatchToProps = { setToAvatar };
export default connect(null, mapDispatchToProps)(FriendList);
