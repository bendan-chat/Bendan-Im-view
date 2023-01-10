// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useImperativeHandle, Ref, useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Modal, message, Button, Form, Input, Radio, Avatar, Descriptions } from "antd";
import UploadAvatar from "./UploadAvatar";
import { Account } from "@/api/interface/user";
import { getUserInfo, getUserInfoParams } from "@/api/modules/user";
import "./userDetails.less";

interface Props {
	innerRef: Ref<{ showModal: (params: any) => void }>;
}

const InfoModal = (props: Props) => {
	const [data, setData] = useState<Account.UserInfo>();
	const [modalVisible, setModalVisible] = useState(false);
	const [submitHidden, setSubmitHidden] = useState<boolean>(true);
	const [form] = Form.useForm();
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
		form.setFieldsValue(data);
	};
	// useEffect(() => {
	// 	let dataTemp = data;
	// 	setData(dataTemp);
	// }, [data]);

	// 修改事件
	const updateClick = () => {
		setSubmitHidden(false);
	};
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const matchSex = (gender: number) => {
		switch (gender) {
			case 0:
				return <span key={0}>女</span>;
				break;
			case 1:
				return <span key={1}>男</span>;
				break;
			case -1:
				return <span key={-1}>未知</span>;
				break;
		}
	};

	return (
		<Modal centered keyboard title="个人信息" open={modalVisible} onCancel={handleCancel} destroyOnClose={true} footer={null}>
			<div hidden={!submitHidden} className="userInfo-descriptions">
				<Descriptions>
					<Descriptions.Item label="账号">{data?.username}</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="昵称">{data?.nickName}</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="性别">{matchSex(data?.gender as number)}</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="手机">{data?.phoneNumber}</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="邮箱">{data?.email}</Descriptions.Item>
				</Descriptions>
				<Descriptions>
					<Descriptions.Item label="头像">
						<Avatar shape="square" size={64} src={data?.avatar} />
					</Descriptions.Item>
				</Descriptions>
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
				<Form.Item label="头像" name={"avatar"}>
					<UploadAvatar avatar={data?.avatar as string} />
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 18 }}>
					<Button hidden={submitHidden} type="primary" htmlType="submit">
						提交
					</Button>
				</Form.Item>
			</Form>
			<div style={{ textAlign: "right" }}>
				<Button hidden={!submitHidden} onClick={updateClick} danger>
					修改信息
				</Button>
			</div>
		</Modal>
	);
};
export default InfoModal;
