import { List, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { store } from "@/redux";
import "./index.less";
import { Account } from "@/api/interface/user";

function FriendList() {
	const navigate = useNavigate();
	const [data, setData] = useState<Account.ChatUser[]>([]);
	const [hoverColor, setHoverColor] = useState<boolean>(true);
	const { friends } = store.getState().chat;
	const appendData = () => {
		setData(friends);
	};
	useEffect(() => {
		appendData();
	}, []);
	return (
		<List
			header={<></>}
			itemLayout="horizontal"
			dataSource={data}
			renderItem={item => (
				<List.Item
					onMouseEnter={() => {
						setHoverColor(true);
					}}
					onMouseLeave={() => {
						setHoverColor(false);
					}}
					onClick={() => {
						navigate("/chat" + "/" + item.id);
					}}
					className={hoverColor ? "index" : ""}
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
