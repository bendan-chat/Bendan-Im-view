// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useImperativeHandle, Ref, useEffect } from "react";
import { Modal, message, Button, Form, Input, Radio, Avatar } from "antd";
import UploadAvatar from "./UploadAvatar";
import { Account } from "@/api/interface/user";
import { getUserInfo, getUserInfoParams } from "@/api/modules/user";

interface Props {
	innerRef: Ref<{ showModal: (params: any) => void }>;
}

const InfoModal = (props: Props) => {
	const [data, setData] = useState<Account.UserInfo>();
	const [modalVisible, setModalVisible] = useState(false);
	const [submitHidden, setSubmitHidden] = useState<boolean>(true);
	useImperativeHandle(props.innerRef, () => ({
		showModal
	}));

	const showModal = (params: { name: number }) => {
		console.log(params);
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

	// 取消按钮的响应
	const handleCancel = () => {
		setModalVisible(false);
		setSubmitHidden(true);
	};

	// 加载用户详情
	const loadUserInfo = async () => {
		const params: getUserInfoParams = {
			username: "admin"
		};
		const { data } = await getUserInfo(params);
		setData(data);
	};

	// 修改事件
	const updateClick = () => {
		setSubmitHidden(false);
	};

	return (
		<Modal centered keyboard title="个人信息" open={modalVisible} onCancel={handleCancel} destroyOnClose={true} footer={null}>
			<Form
				disabled={submitHidden}
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 10 }}
				layout="horizontal"
				onFinish={handleOk}
				size={"small"}
			>
				<Form.Item
					initialValue={data?.username}
					name={["userinfo", "username"]}
					label="账号"
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 8 }}
				>
					{submitHidden ? <span>{data?.username}</span> : <Input />}
				</Form.Item>
				<Form.Item
					wrapperCol={{ span: 8 }}
					labelCol={{ span: 4 }}
					name={["userinfo", "nickName"]}
					label="昵称"
					initialValue={data?.nickName}
				>
					{submitHidden ? <span>{data?.nickName}</span> : <Input />}
				</Form.Item>
				<Form.Item label="性别" name={["userinfo", "gender"]} initialValue={data?.gender}>
					<Radio.Group value={data?.gender}>
						<Radio value={0}> 女 </Radio>
						<Radio value={1}> 男 </Radio>
						<Radio value={-1}> 未知 </Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item label="手机" name={["userinfo", "phoneNumber"]} initialValue={data?.phoneNumber}>
					{submitHidden ? <span>{data?.phoneNumber}</span> : <Input />}
				</Form.Item>
				<Form.Item label="邮箱" name={["userinfo", "email"]} initialValue={data?.email}>
					{submitHidden ? <span>{data?.email}</span> : <Input />}
				</Form.Item>
				<Form.Item label="头像" name={["userinfo", "avatar"]} initialValue={data?.avatar}>
					{submitHidden ? <Avatar shape="square" size={64} src={data?.avatar} /> : <UploadAvatar />}
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 18 }}>
					<Button hidden={submitHidden} type="primary" htmlType="submit">
						提交
					</Button>
				</Form.Item>
			</Form>
			<Button hidden={!submitHidden} onClick={updateClick} danger>
				修改信息
			</Button>
		</Modal>
	);
};
export default InfoModal;
