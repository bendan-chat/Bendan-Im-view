import { useEffect, useState } from "react";
import { store } from "@/redux";
import { useNavigate } from "react-router-dom";
import { Account } from "@/api/interface/user";

import { List, Avatar } from "antd";

import "./index.less";

function FriendList() {
	const navigate = useNavigate();
	const [data, setData] = useState<Account.ChatUser[]>([]);
	const { friends } = store.getState().chat;
	const [selectId, setSelectId] = useState<number>();

	useEffect(() => {
		setData(friends);
	}, [friends]);

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
}

export default FriendList;
