import { useEffect, useState } from "react";
import { store } from "@/redux";
import { useNavigate } from "react-router-dom";
import { Account } from "@/api/interface/user";
import { setToAvatar } from "@/redux/modules//chat/action";
import { List, Avatar } from "antd";

import { getFriendParams, getFriends } from "@/api/modules/user";
import "./index.less";
import { connect } from "react-redux";

const FriendList = (props: any) => {
	const navigate = useNavigate();
	const { setToAvatar } = props;
	const [data, setData] = useState<Account.ChatUser[]>([]);
	const { username } = store.getState().global.userInfo;
	const [selectId, setSelectId] = useState<number>();
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

	return (
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
	);
};

const mapDispatchToProps = { setToAvatar };
export default connect(null, mapDispatchToProps)(FriendList);
