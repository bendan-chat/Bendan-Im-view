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
		let username = values.username;
		let nickName = values.nickName;
		let gender = values.gender;
		let phoneNumber = values.phoneNumber;
		let email = values.email;
		setModalVisible(false);
		store.dispatch(
			setUserInfo({
				userId: userId,
				username: username,
				avatar: avatar,
				nickName: nickName
			})
		);
		updateUser({
			id: userId,
			username: username,
			nickName: nickName,
			gender: gender,
			phoneNumber: phoneNumber,
			email: email,
			updateId: userId
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
