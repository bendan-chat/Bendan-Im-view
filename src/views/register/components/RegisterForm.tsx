/* eslint-disable @typescript-eslint/no-unused-vars */
import { Account } from "@/api/interface/user";
import { listAllUsernames, registerUser } from "@/api/modules/user";
import { isPasswordCheck2, usernameCheck } from "@/utils/util";
import { Button, Form, Input, message, Radio } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 }
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 }
	}
};

const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0
		},
		sm: {
			span: 16,
			offset: 8
		}
	}
};
export default function RegisterForm() {
	const [form] = Form.useForm();
	const [usernames, setUsernames] = useState<string[]>([]);
	const navigate = useNavigate();

	/**
	 * init 所有用户名
	 */
	useEffect(() => {
		loadData();
	}, []);

	/**
	 * 加载 所有用户名
	 */
	const loadData = async () => {
		const { data } = await listAllUsernames();
		setUsernames(data);
	};

	const onFinish = (values: any) => {
		const param: Account.UserInfoDetail = {
			username: values.username,
			nickName: values.nickName,
			selfDescription: values.selfDescription,
			password: values.password,
			email: values.email,
			phoneNumber: values.phoneNumber,
			gender: values.gender,
			roleIds: [1]
		};
		console.log(values);
		console.log(param);
		registerUser(param).then(res => {
			if (res.success) {
				navigate("/login");
				message.success("注册成功，试试登录吧 🎉🎉🎉");
			} else {
				return Promise.reject(new Error("服务器异常，请联系管理员"));
			}
		});
	};

	return (
		<div className="register-form">
			<Form {...formItemLayout} form={form} name="register" onFinish={onFinish} scrollToFirstError>
				<Form.Item
					name="username"
					label="账号"
					rules={[
						{ required: true, message: "请输入账号！！！" },
						() => ({
							validator(_, value) {
								if (value != null || value != "") {
									if (usernameCheck(value)) {
										return Promise.resolve();
									}
									return Promise.reject(new Error("账号只能由数字或者英文组成！！！"));
								}
							}
						}),
						() => ({
							validator(_, value) {
								if (value != null || value != "") {
									if (usernames.indexOf(value) == -1) {
										return Promise.resolve();
									}
									return Promise.reject(new Error("当前账号已有人使用！！！"));
								}
							}
						})
					]}
				>
					<Input maxLength={20} allowClear={true} className="register-form-input" />
				</Form.Item>

				<Form.Item
					name="nickName"
					label="昵称"
					tooltip="你希望别人看到你是什么名字?"
					rules={[{ required: true, message: "请输入你的昵称！！！", whitespace: true }]}
				>
					<Input maxLength={20} allowClear={true} className="register-form-input" />
				</Form.Item>

				<Form.Item
					name="email"
					label="E-mail"
					rules={[
						{
							type: "email",
							message: "输入的不是 E-mail！！！"
						},
						{
							required: true,
							message: "请输入你的 E-mail！！！"
						}
					]}
				>
					<Input allowClear={true} className="register-form-input" />
				</Form.Item>

				<Form.Item
					name="password"
					label="密码"
					rules={[
						{
							required: true,
							message: "请输入你的密码！！！"
						},
						() => ({
							validator(_, value) {
								if (value != null || value != "") {
									if (isPasswordCheck2(value)) {
										return Promise.resolve();
									}
									return Promise.reject(new Error("密码必须包含 数字和英文(不区分大小写)或字符，长度8-16"));
								}
							}
						})
					]}
					hasFeedback
				>
					<Input.Password maxLength={16} allowClear={true} className="register-form-input" />
				</Form.Item>

				<Form.Item
					name="confirm"
					label="确认密码"
					dependencies={["password"]}
					hasFeedback
					rules={[
						{
							required: true,
							message: "请再输入一遍你的密码！！！"
						},
						{
							min: 8,
							message: "密码最小长度为8！！！"
						},
						{
							max: 16,
							message: "密码最大长度为16！！！"
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue("password") === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error("前后密码不一致！！！"));
							}
						})
					]}
				>
					<Input.Password maxLength={16} allowClear={true} className="register-form-input" />
				</Form.Item>

				<Form.Item name="phoneNumber" label="手机号" rules={[{ required: true, message: "请输入你的手机号！！！" }]}>
					<Input allowClear={true} maxLength={11} className="register-form-input" style={{ width: "100%" }} />
				</Form.Item>

				<Form.Item name="gender" label="性别" rules={[{ required: true, message: "请选择你的性别！！！" }]}>
					<Radio.Group>
						<Radio value={0}>女</Radio>
						<Radio value={1}>男</Radio>
						<Radio value={-1}>未知</Radio>
					</Radio.Group>
				</Form.Item>

				<Form.Item name="selfDescription" label="个性签名" tooltip="请用一句话描述一下自己">
					<Input.TextArea allowClear={true} maxLength={100} className="register-form-input-textArea" />
				</Form.Item>

				<Form.Item {...tailFormItemLayout}>
					<Button className="register-form-btn" type="primary" htmlType="submit">
						注册
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
