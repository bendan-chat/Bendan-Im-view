import { Outlet, useNavigate, useParams } from "react-router-dom";
import { CSSProperties, useEffect, useState } from "react";
import { Layout } from "antd";
import LayoutFooter from "./components/Footer";
import FriendList from "./components/List";
import { MenuProps, Menu } from "antd";

import Sider from "antd/lib/layout/Sider";
import { Content } from "antd/lib/layout/layout";
import UserStatus from "./components/Header/UserStatus";
import { MessageOutlined, TeamOutlined } from "@ant-design/icons";
// import Language from "./components/Header/Language";
// import AssemblySize from "./components/Header/AssemblySize";
// import Theme from "./components/Header/Theme";
// import Fullscreen from "./components/Header/Fullscreen";

import "./index.less";

function LayoutIndex() {
	type MenuItem = Required<MenuProps>["items"][number];
	const [iconStyle, setIconStyle] = useState<boolean>(false);
	const [menuItemStyle, setMenuItemStyle] = useState<boolean[]>([true, false, false]);
	const { id } = useParams();
	const [chatNum, setChatNum] = useState<string>("");

	const navigate = useNavigate();
	// * icon 样式
	const styleColor: CSSProperties | undefined = {
		fontSize: "18px",
		color: "#08c"
	};
	const style: CSSProperties | undefined = {
		fontSize: "18px",
		color: ""
	};
	const selectedStyle = (key: number) => {
		let menuItemStyleTemp = menuItemStyle;
		for (let i = 0; i < menuItemStyleTemp.length; i++) {
			if (i == key) {
				menuItemStyleTemp[i] = true;
				continue;
			}
			menuItemStyleTemp[i] = false;
		}
		setMenuItemStyle(menuItemStyleTemp);
	};

	useEffect(() => {
		setIconStyle(iconStyle);
	}, [iconStyle]);
	const items: MenuItem[] = [
		{
			label: "",
			key: "11",
			icon: <MessageOutlined style={menuItemStyle[0] ? styleColor : style} />,
			onClick: () => {
				if (chatNum == undefined || chatNum == "") {
					navigate("/home/index");
				} else {
					navigate("/chat" + "/" + chatNum);
				}
				selectedStyle(0);
			}
		},
		{
			label: "",
			key: "12",
			icon: <TeamOutlined style={menuItemStyle[1] ? styleColor : style} />,
			onClick: () => {
				setChatNum(id!);
				navigate("/group");
				selectedStyle(1);
			}
		}
		// ,
		// {
		// 	label: "",
		// 	key: "13",
		// 	icon: <Language />
		// },
		// {
		// 	label: "",
		// 	key: "14",
		// 	icon: <AssemblySize />
		// },
		// {
		// 	label: "",
		// 	key: "15",
		// 	icon: <Theme />
		// },
		// {
		// 	label: "",
		// 	key: "16",
		// 	icon: <Fullscreen />
		// }
	];

	return (
		<section className="container">
			<Sider trigger={null} collapsed={false} width={60} theme="dark">
				<UserStatus />
				<Menu selectable={false} theme="dark" mode="inline" items={items} style={{ minWidth: 20, flex: "auto" }}></Menu>
			</Sider>
			<Sider trigger={null} width={220} theme="light">
				<FriendList />
			</Sider>
			<Layout>
				<Content>
					<Outlet></Outlet>
				</Content>
				<LayoutFooter></LayoutFooter>
			</Layout>
		</section>
	);
}

export default LayoutIndex;
