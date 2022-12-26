import { List, Avatar } from "antd";
// import { useNavigate } from "react-router-dom";

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
// 点击当前菜单跳转页面
// const navigate = useNavigate();
function ItemClick() {
	// navigate("/chat");
	console.log("ItemClick");
}
function ItemMouseEnter() {
	console.log("ItemMouseEnter");
}

function FriendList() {
	return (
		<List
			itemLayout="horizontal"
			dataSource={data}
			renderItem={item => (
				<List.Item onMouseEnter={ItemMouseEnter} onClick={ItemClick}>
					<List.Item.Meta
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
