import { Button, Form, Input, Space } from "antd";
import { useState } from "react";

export default function PasswordForm() {
	// const [nextStep, setNextStep] = useState<boolean>(true);
	// const [passwordFrom, setPasswordFrom] = useState<boolean>(true);
	const [nextStep, setNextStep] = useState<number>(1);

	const onFinish = (values: any) => {
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};
	const nextClick = () => {
		console.log("nextStep", nextStep);
		let nextStep2 = nextStep + 1;
		console.log(nextStep2);

		setNextStep(nextStep2);
		console.log("nextStep", nextStep);
		// setPasswordFrom()
	};

	const previousStep = () => {
		setNextStep(nextStep - 1);
		console.log("previousStep", nextStep);
		// setNextStep(true);
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
			<div hidden={false}>
				{nextStep}
				<Form.Item label="邮箱" name="email" rules={[{ required: true, message: "Please input your username!" }]}>
					<Input />
				</Form.Item>

				<Form.Item hidden={nextStep == 2} wrapperCol={{ span: 10 }} label="验证码" name="verificationCode">
					<Input />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 6, span: 16 }}>
					<Space>
						<Button hidden={nextStep == 2} onClick={previousStep} type="primary">
							<span>上一步</span>
						</Button>
						<Button onClick={nextClick} type="primary" htmlType="submit">
							<span>下一步</span>
						</Button>
					</Space>
				</Form.Item>
			</div>
			<div hidden={true}>
				<Form.Item label="旧密码" name="oldPassword">
					<Input.Password />
				</Form.Item>

				<Form.Item label="新密码" name="newPassword">
					<Input.Password />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 6, span: 16 }}>
					<Space>
						<Button hidden={nextStep >= 1} onClick={previousStep} type="primary">
							<span>上一步</span>
						</Button>
						<Button onClick={nextClick} type="primary" htmlType="submit">
							<span>下一步</span>
						</Button>
					</Space>
				</Form.Item>
			</div>
		</Form>
	);
}
