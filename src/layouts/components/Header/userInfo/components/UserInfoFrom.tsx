/* eslint-disable @typescript-eslint/no-unused-vars */
import { Account } from "@/api/interface/user";
import { updateUser } from "@/api/modules/user";
import { store } from "@/redux";
import { setUserInfo } from "@/redux/modules/global/action";
import { Button, Form, Input, message, Modal, Radio } from "antd";
import React, { Ref, useImperativeHandle, useState } from "react";

interface Props {
	innerRef: Ref<{ showModal: (params: any) => void }>;
	data: Account.UserInfo;
	setModalVisible: (modalVisible: boolean) => void;
}

export default function UserInfoFrom({ innerRef, data, setModalVisible }: Props) {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const { userId, avatar } = store.getState().global.userInfo;
	const [form] = Form.useForm();

	useImperativeHandle(innerRef, () => ({
		showModal
	}));

	const showModal = () => {
		setIsModalVisible(true);
		form.setFieldsValue(data);
	};

	// 修改用户信息
	const onFinish = (values: any) => {
		let usernameMy = values.username;
		let nickNameMy = values.nickName;
		let genderMy = values.gender;
		let phoneNumberMy = values.phoneNumber;
		let emailMy = values.email;
		setIsModalVisible(false);
		setModalVisible(false);

		updateUser({
			id: userId,
			username: usernameMy,
			nickName: nickNameMy,
			gender: genderMy,
			phoneNumber: phoneNumberMy,
			email: emailMy,
			updateId: userId
		}).then(res => {
			if (res.success) {
				store.dispatch(
					setUserInfo({
						userId: userId,
						username: usernameMy,
						avatar: avatar,
						nickName: nickNameMy,
						email: emailMy
					})
				);
			}
		});
		message.success("修改用户信息成功 🎉🎉🎉");
	};
	return (
		<Modal
			width={500}
			centered
			keyboard
			footer={null}
			title="修改用户信息"
			open={isModalVisible}
			onCancel={() => setIsModalVisible(false)}
			destroyOnClose={true}
		>
			<div className="form-userInfo-parent">
				<Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 10 }} layout="horizontal" onFinish={onFinish}>
					<Form.Item name={"username"} label="账号" labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
						<Input />
					</Form.Item>
					<Form.Item wrapperCol={{ span: 8 }} labelCol={{ span: 4 }} name={"nickName"} label="昵称">
						<Input />
					</Form.Item>
					<Form.Item label="性别" name={"gender"} initialValue={data?.gender}>
						<Radio.Group value={data?.gender as number}>
							<Radio value={0}>女</Radio>
							<Radio value={1}>男</Radio>
							<Radio value={-1}>未知</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="手机" name={"phoneNumber"}>
						<Input />
					</Form.Item>
					<Form.Item label="邮箱" name={"email"}>
						<Input />
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 18 }}>
						<Button
							className="form-userInfo-btn"
							style={{ width: "80px", height: "32px", borderRadius: "10px" }}
							type="primary"
							htmlType="submit"
						>
							提交
						</Button>
					</Form.Item>
				</Form>
			</div>
		</Modal>
	);
}
