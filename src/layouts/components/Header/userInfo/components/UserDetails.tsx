/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useImperativeHandle, Ref, useEffect, useRef } from "react";
import { Modal, message, Button, Form, Input, Radio } from "antd";
import UploadAvatar from "./UploadAvatar";
import { Account } from "@/api/interface/user";
import { store } from "@/redux";
import { getUserInfo } from "@/api/modules/user";
import { ToTopOutlined } from "@ant-design/icons";

import "./userDetails.less";

interface Props {
	innerRef: Ref<{ showModal: (params: any) => void }>;
}

const InfoModal = (props: Props) => {
	const [data, setData] = useState<Account.UserInfo>();
	const [modalVisible, setModalVisible] = useState(false);
	const [submitHidden, setSubmitHidden] = useState<boolean>(true);
	const { username, avatar } = store.getState().global.userInfo;
	const [myAvatar, setMyAvatar] = useState<string>(avatar);

	const [form] = Form.useForm();
	useImperativeHandle(props.innerRef, () => ({
		showModal
	}));

	const showModal = () => {
		loadUserInfo();
		setModalVisible(true);
	};

	// 修改用户信息
	const handleOk = (values: any) => {
		setSubmitHidden(true);
		setModalVisible(false);
		console.log("values: ", values);
		message.success("修改用户信息成功 🎉🎉🎉");
	};

	// 加载用户详情
	const loadUserInfo = () => {
		getUserInfo(username).then(res => {
			if (res.success) {
				setData(res.data);
				form.setFieldsValue(res.data);
			}
		});
	};

	/**
	 * 匹配性别
	 * @param gender
	 * @returns
	 */
	const matchSex = (gender: number) => {
		switch (gender) {
			case 0:
				return <span key={0}>女</span>;
			case 1:
				return <span key={1}>男</span>;
			case -1:
				return <span key={-1}>未知</span>;
		}
	};

	return (
		<Modal
			width={1000}
			centered
			keyboard
			title="个人信息"
			open={modalVisible}
			onCancel={() => {
				setModalVisible(false);
				setSubmitHidden(true);
			}}
			destroyOnClose={true}
			footer={null}
		>
			<div hidden={!submitHidden} className="userinfo-parent">
				<img className="big-img" src={myAvatar} />
				<div className="userinfo-text-parent">
					<div className="userinfo-text-item">
						<label>账号：</label>
						<span>{data?.username}</span>
					</div>
					<div className="userinfo-text-item">
						<label>昵称：</label>
						<span>{data?.nickName}</span>
					</div>
					<div className="userinfo-text-item">
						<label>性别：</label>
						{matchSex(data?.gender as number)}
					</div>
					<div className="userinfo-text-item">
						<label>手机：</label>
						<span>{data?.phoneNumber}</span>
					</div>
					<div className="userinfo-text-item">
						<label>邮箱：</label>
						<span>{data?.email}</span>
					</div>
				</div>
			</div>
			<Form
				form={form}
				hidden={submitHidden}
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 10 }}
				layout="horizontal"
				onFinish={handleOk}
				size={"small"}
			>
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
						style={{ width: "80px", height: "32px", borderRadius: "10px" }}
						hidden={submitHidden}
						type="primary"
						htmlType="submit"
					>
						提交
					</Button>
				</Form.Item>
			</Form>
			<div className="btn-down-parent">
				<UploadAvatar />
				<Button
					className="btn-down"
					type="primary"
					style={{ borderRadius: "8px" }}
					hidden={!submitHidden}
					onClick={() => setSubmitHidden(false)}
				>
					修改信息
				</Button>
			</div>
		</Modal>
	);
};
export default InfoModal;
