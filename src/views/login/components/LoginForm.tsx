import { useEffect, useState } from "react";
import { Button, Form, Input, message, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { Login } from "@/api/interface/user";
import { login } from "@/api/modules/user";
import { HOME_URL } from "@/config/config";
import { connect } from "react-redux";
import { setToken, setUserInfo } from "@/redux/modules/global/action";
import { useTranslation } from "react-i18next";
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { ResultEnum } from "@/enums/httpEnum";
import { store } from "@/redux";
import { setListMatch, setMenuIconKey } from "@/redux/modules/menu/action";

const LoginForm = (props: any) => {
	const { t } = useTranslation();
	const { setToken, setUserInfo } = props;
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);

	/**
	 * 清理缓存
	 */
	useEffect(() => {
		store.dispatch(setListMatch(false));
		store.dispatch(setMenuIconKey("11"));
	}, []);

	// 登录
	const onFinish = async (loginForm: Login.ReqLoginForm) => {
		try {
			setLoading(true);
			const { data, msg, code } = await login(loginForm);
			if (code === ResultEnum.SUCCESS) {
				let token = data?.oauth2AccessTokenResponse?.accessToken?.tokenValue;
				setToken("Bearer " + token);
				setUserInfo({
					userId: data.userId,
					username: loginForm.username,
					avatar: data.avatar,
					nickName: data.nickName,
					email: data.email
				});

				message.success(msg);
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
				<Space size={"middle"}>
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
				</Space>
			</Form.Item>
			<div>
				<Button
					type="link"
					onClick={() => {
						navigate("/login/forget");
					}}
				>
					忘记密码
				</Button>
				<Button
					type="link"
					style={{ float: "right" }}
					onClick={() => {
						navigate("/login/register");
					}}
				>
					立即注册
				</Button>
			</div>
		</Form>
	);
};

const mapDispatchToProps = { setToken, setUserInfo };
export default connect(null, mapDispatchToProps)(LoginForm);
