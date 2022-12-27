import { List, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { getFriends } from "@/api/modules/user";
import "./index.less";

const data = [
	{
		title: "Ant Design Title 1"
	},
	{
		title: "Ant Design Title 2"
	},
	{
		title: "Ant Design Title 3"
	},
	{
		title: "Ant Design Title 4"
	}
];

function FriendList() {
	// const { } = await getFriends()
	const navigate = useNavigate();
	const [hoverColor, setHoverColor] = useState<boolean>(true);

	// 点击当前菜单跳转页面
	function ItemClick() {
		navigate("/chat");
	}
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
					onClick={ItemClick}
					className={hoverColor ? "index" : ""}
				>
					<List.Item.Meta
						className="index"
						avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
						title={item.title}
						description="is refined by Ant UED Team.."
					/>
				</List.Item>
			)}
		/>
	);
}

export default FriendList;
