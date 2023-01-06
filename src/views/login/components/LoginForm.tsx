import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Login } from "@/api/interface/user";
import { loginApi, getFriends, getFriendParams } from "@/api/modules/user";
import { HOME_URL } from "@/config/config";
import { connect } from "react-redux";
import { setToken, setUserInfo } from "@/redux/modules/global/action";
import { setFriends } from "@/redux/modules/chat/action";
import { useTranslation } from "react-i18next";
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { ResultEnum } from "@/enums/httpEnum";
import { createWsClient } from "@/websocket/index";

const LoginForm = (props: any) => {
	const { t } = useTranslation();
	const { setToken, setFriends, setUserInfo } = props;
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async function loadFriends(username: string) {
		const params: getFriendParams = {
			username
		};
		const { data } = await getFriends(params);
		setFriends(data);
	}

	// 登录
	const onFinish = async (loginForm: Login.ReqLoginForm) => {
		try {
			setLoading(true);
			const { data, msg, code } = await loginApi(loginForm);
			if (code === ResultEnum.SUCCESS) {
				setToken(data?.oauth2AccessTokenResponse?.accessToken?.tokenValue);
				setUserInfo({
					id: data.userId,
					username: loginForm.username,
					avatar: data.avatar
				});
				message.success(msg);
				// loadFriends(loginForm.username);
				// *  连接ws
				createWsClient();
				navigate(HOME_URL);
			}
		} finally {
			setLoading(false);
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<Form
			form={form}
			name="basic"
			labelCol={{ span: 5 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			size="large"
			autoComplete="off"
		>
			<Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
				<Input placeholder="用户名" prefix={<UserOutlined />} />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
				<Input.Password autoComplete="new-password" placeholder="密码" prefix={<LockOutlined />} />
			</Form.Item>
			<Form.Item className="login-btn">
				<Button
					onClick={() => {
						form.resetFields();
					}}
					icon={<CloseCircleOutlined />}
				>
					{t("login.reset")}
				</Button>
				<Button type="primary" htmlType="submit" loading={loading} icon={<UserOutlined />}>
					{t("login.confirm")}
				</Button>
			</Form.Item>
		</Form>
	);
};

const mapDispatchToProps = { setToken, setFriends, setUserInfo };
export default connect(null, mapDispatchToProps)(LoginForm);
