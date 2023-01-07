import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import LayoutFooter from "./components/Footer";
import FriendList from "./components/List";
import { MenuProps, Menu } from "antd";
import "./index.less";
import AssemblySize from "./components/Header/components/AssemblySize";
import Language from "./components/Header/components/Language";
import Theme from "./components/Header/components/Theme";
import Fullscreen from "./components/Header/components/Fullscreen";
import Sider from "antd/lib/layout/Sider";
import { Content } from "antd/lib/layout/layout";
import UserStatus from "./components/Header/components/UserStatus";
import { MessageOutlined, TeamOutlined } from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
	label: React.ReactNode,
	key?: React.Key | null,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: "group"
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type
	} as MenuItem;
}
const items: MenuItem[] = [
	getItem("", "2", <UserStatus />),
	getItem("", "5", <MessageOutlined style={{ fontSize: "18px" }} />),
	getItem("", "4", <TeamOutlined style={{ fontSize: "18px" }} />),
	getItem("", "6", <Language />),
	getItem("", "7", <AssemblySize />),
	getItem("", "8", <Theme />),
	getItem("", "9", <Fullscreen />)
];
function LayoutIndex() {
	return (
		<section className="container">
			<Sider trigger={null} collapsed={false} width={60} theme="dark">
				<Menu theme="dark" mode="inline" items={items} style={{ minWidth: 20, flex: "auto" }}></Menu>
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
