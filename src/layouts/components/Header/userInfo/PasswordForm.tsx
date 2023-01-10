import { Button, Form, Input, message, Space } from "antd";
import { useState } from "react";

interface IProps {
	onModalHidden: () => void;
}

export default function PasswordForm({ onModalHidden }: IProps) {
	const [nextStep, setNextStep] = useState<number>(1);
	const [loadings, setLoadings] = useState<boolean[]>([]);

	const onFinish = (values: any) => {
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};
	const nextClick = () => {
		switch (nextStep) {
			case 1:
				// 发送邮箱 生成验证码
				setNextStep(nextStep + 1);
				break;
			case 2:
				// 发送邮箱 生成验证码
				setLoadings([true]);
				setInterval(() => {
					setNextStep(nextStep + 1);
				}, 2000);
				break;
			case 3:
				setLoadings([...loadings, true]);
				setInterval(() => {
					onModalHidden();
				}, 2000);
				// 跳到登录页
				message.success("修改密码成功~!!");
				break;
		}
	};

	const previousStep = () => {
		setNextStep(nextStep - 1);
	};
	return (
		<Form
			name="basic"
			labelCol={{ span: 6 }}
			wrapperCol={{ span: 16 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<div hidden={nextStep >= 3}>
				{nextStep}
				<Form.Item
					initialValue={""}
					label="邮箱"
					name="email"
					rules={[{ required: true, message: "Please input your username!" }]}
				>
					<Input />
				</Form.Item>
				<Form.Item initialValue={""} hidden={nextStep == 1} wrapperCol={{ span: 10 }} label="验证码" name="verificationCode">
					<Input />
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 6, span: 16 }}>
					<Space>
						<Button hidden={nextStep == 1} onClick={previousStep} type="primary">
							<span>上一步</span>
						</Button>
						<Button loading={loadings[0]} onClick={nextClick} type="primary" htmlType="submit">
							<span>下一步</span>
						</Button>
					</Space>
				</Form.Item>
			</div>
			<div hidden={nextStep < 3}>
				{nextStep}
				<Form.Item initialValue={""} label="旧密码" name="oldPassword">
					<Input.Password />
				</Form.Item>
				<Form.Item initialValue={""} label="新密码" name="newPassword">
					<Input.Password />
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 19, span: 20 }}>
					<Space>
						<Button loading={loadings[1]} danger onClick={nextClick} type="primary" htmlType="submit">
							<span>修改</span>
						</Button>
					</Space>
				</Form.Item>
			</div>
		</Form>
	);
}
