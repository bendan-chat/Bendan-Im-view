/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { CSSProperties, useEffect, useState } from "react";
import { store } from "@/redux";
import { Layout } from "antd";
import LayoutFooter from "./components/Footer";
import FriendList from "./components/List/FriendList";
import { MenuProps, Menu } from "antd";

import Sider from "antd/lib/layout/Sider";
import { Content } from "antd/lib/layout/layout";
import UserStatus from "./components/Header/userInfo/UserStatus";
import { MessageOutlined, TeamOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { setListMatch, setMenuIconKey } from "@/redux/modules/menu/action";
import ChatList from "./components/List/ChatList";

import "./index.less";

const LayoutIndex = () => {
	type MenuItem = Required<MenuProps>["items"][number];

	const [chatNum, setChatNum] = useState<string>("");

	const navigate = useNavigate();
	const menuIconKey = store.getState().menu.menuIconKey;
	const listMatch = store.getState().menu.listMatch;
	const { id } = useParams();

	// * icon 样式
	const styleColor: CSSProperties | undefined = {
		fontSize: "18px",
		color: "#08c"
	};
	const style: CSSProperties | undefined = {
		fontSize: "18px",
		color: ""
	};

	const items: MenuItem[] = [
		{
			label: "",
			key: "11",
			icon: <MessageOutlined style={menuIconKey == "11" ? styleColor : style} />,
			onClick: () => {
				if (chatNum == undefined || chatNum == "") {
					navigate("/home/index");
				} else {
					navigate("/chat" + "/" + chatNum);
				}
				store.dispatch(setListMatch(false));
				store.dispatch(setMenuIconKey("11"));
			}
		},
		{
			label: "",
			key: "12",
			icon: <TeamOutlined style={menuIconKey == "12" ? styleColor : style} />,
			onClick: () => {
				setChatNum(id!);
				navigate("/friends");
				store.dispatch(setListMatch(true));
				store.dispatch(setMenuIconKey("12"));
			}
		}
		// ,
		// {
		// 	label: "",
		// 	key: "13",
		// 	icon: <FolderOpenOutlined style={menuIconKey == "13" ? styleColor : style} />,
		// 	onClick: () => {
		// 		navigate("/files");
		// 		store.dispatch(setMenuIconKey("13"));
		// 	}
		// }
	];

	return (
		<section className="container">
			<Sider trigger={null} collapsed={false} width={60} theme="dark">
				<UserStatus />
				<Menu selectable={false} theme="dark" mode="inline" items={items} style={{ minWidth: 20, flex: "auto" }}></Menu>
			</Sider>
			<Sider trigger={null} width={220} theme="light">
				{listMatch ? <FriendList /> : <ChatList />}
			</Sider>
			<Layout>
				<Content>
					<Outlet></Outlet>
				</Content>
				<LayoutFooter></LayoutFooter>
			</Layout>
		</section>
	);
};

export default LayoutIndex;
