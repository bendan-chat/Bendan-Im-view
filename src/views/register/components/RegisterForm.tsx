import { AutoComplete, Button, Col, Form, Input, Radio, Row, Select, Upload } from "antd";
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";

const { Option } = Select;

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
	const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

	const onFinish = (values: any) => {
		console.log("Received values of form: ", values);
	};

	const prefixSelector = (
		<Form.Item name="prefix" noStyle>
			<Select style={{ width: 70 }}>
				<Option value="86">+86</Option>
				<Option value="87">+87</Option>
			</Select>
		</Form.Item>
	);

	const onWebsiteChange = (value: string) => {
		if (!value) {
			setAutoCompleteResult([]);
		} else {
			setAutoCompleteResult([".com", ".org", ".net"].map(domain => `${value}${domain}`));
		}
	};

	const websiteOptions = autoCompleteResult.map(website => ({
		label: website,
		value: website
	}));

	const normFile = (e: any) => {
		console.log("Upload event:", e);
		if (Array.isArray(e)) {
			return e;
		}
		return e?.fileList;
	};
	return (
		<Form
			{...formItemLayout}
			form={form}
			name="register"
			onFinish={onFinish}
			initialValues={{ residence: ["zhejiang", "hangzhou", "xihu"], prefix: "86" }}
			style={{ maxWidth: 600 }}
			scrollToFirstError
		>
			<Form.Item name="website" label="账户" rules={[{ required: true, message: "Please input website!" }]}>
				<AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
					<Input />
				</AutoComplete>
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
				<Input />
			</Form.Item>

			<Form.Item
				name="password"
				label="密码"
				rules={[
					{
						required: true,
						message: "请输入你的密码！！！"
					}
				]}
				hasFeedback
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				name="confirm"
				label="确认密码"
				dependencies={["password"]}
				hasFeedback
				rules={[
					{
						required: true,
						message: "Please confirm your password!"
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue("password") === value) {
								return Promise.resolve();
							}
							return Promise.reject(new Error("The two passwords that you entered do not match!"));
						}
					})
				]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				name="nickname"
				label="昵称"
				tooltip="What do you want others to call you?"
				rules={[{ required: true, message: "Please input your nickname!", whitespace: true }]}
			>
				<Input />
			</Form.Item>

			<Form.Item name="phone" label="手机号" rules={[{ required: true, message: "Please input your phone number!" }]}>
				<Input addonBefore={prefixSelector} style={{ width: "100%" }} />
			</Form.Item>

			<Form.Item name="gender" label="性别" rules={[{ required: true, message: "Please select gender!" }]}>
				<Radio.Group>
					<Radio value={0}>女</Radio>
					<Radio value={1}>男</Radio>
					<Radio value={-1}>未知</Radio>
				</Radio.Group>
			</Form.Item>

			<Form.Item name="intro" label="个性签名" rules={[{ required: true, message: "Please input Intro" }]}>
				<Input.TextArea showCount maxLength={100} />
			</Form.Item>

			<Form.Item label="头像">
				<Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
					<Upload.Dragger name="files" action="/upload.do">
						<p className="ant-upload-drag-icon">
							<InboxOutlined />
						</p>
						<p className="ant-upload-text">Click or drag file to this area to upload</p>
						<p className="ant-upload-hint">Support for a single or bulk upload.</p>
					</Upload.Dragger>
				</Form.Item>
			</Form.Item>

			<Form.Item label="验证码" extra="We must make sure that your are a human.">
				<Row gutter={8}>
					<Col span={12}>
						<Form.Item name="captcha" noStyle rules={[{ required: true, message: "Please input the captcha you got!" }]}>
							<Input />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Button>Get captcha</Button>
					</Col>
				</Row>
			</Form.Item>
			<Form.Item {...tailFormItemLayout}>
				<Button type="primary" htmlType="submit">
					Register
				</Button>
			</Form.Item>
		</Form>
	);
}
