import { store } from "@/redux";
import { useRef } from "react";
import { Avatar, Modal, Dropdown, message, MenuProps } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { HOME_URL } from "@/config/config";
import { connect } from "react-redux";
import { setToken } from "@/redux/modules/global/action";
import InfoModal from "./components/UserDetails";
import PasswordModal from "./PasswordModal";
import { logout } from "@/api/modules/user";

import "./UserStatus.less";

function UserStatus(props: any) {
	const { avatar } = store.getState().global.userInfo;

	const { setToken } = props;
	const navigate = useNavigate();

	interface ModalProps {
		showModal: () => void;
	}

	const passRef = useRef<ModalProps>(null);
	const infoRef = useRef<ModalProps>(null);

	// 退出登录
	const userLogout = () => {
		Modal.confirm({
			title: "温馨提示 🧡",
			icon: <ExclamationCircleOutlined />,
			content: "是否确认退出登录？",
			okText: "确认",
			cancelText: "取消",
			onOk: async () => {
				await logout();
				setToken("");
				message.success("退出登录成功！");
				navigate("/login");
			}
		});
	};

	const items: MenuProps["items"] = [
		{
			key: "1",
			label: <span className="dropdown-item">首页</span>,
			onClick: () => navigate(HOME_URL)
		},
		{
			key: "2",
			label: <span className="dropdown-item">个人信息</span>,
			onClick: () => infoRef.current!.showModal()
		},
		{
			key: "3",
			label: <span className="dropdown-item">修改密码</span>,
			onClick: () => passRef.current!.showModal()
		},
		{
			type: "divider"
		},
		{
			key: "4",
			label: <span className="dropdown-item">退出登录</span>,
			onClick: userLogout
		}
	];
	return (
		<div className="userinfo-dropdown" style={{ height: 32, margin: 16, background: "rgba(255, 255, 255, 0.2)" }}>
			<Dropdown menu={{ items }} placement="bottom" arrow trigger={["click"]}>
				<Avatar shape="square" size={32} src={avatar} />
			</Dropdown>
			<InfoModal innerRef={infoRef}></InfoModal>
			<PasswordModal innerRef={passRef}></PasswordModal>
		</div>
	);
}

const mapDispatchToProps = { setToken };
export default connect(null, mapDispatchToProps)(UserStatus);
