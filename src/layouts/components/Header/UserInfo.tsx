import { useState, useImperativeHandle, Ref, useEffect } from "react";
import { Modal, message, Button, Form, Input, Radio, Avatar } from "antd";
import { getUserInfo, getUserInfoParams } from "@/api/modules/user";
import { store } from "@/redux";
// import UploadAvatar from "./UploadAvatar";
import { Account } from "@/api/interface/user";

interface Props {
	innerRef: Ref<{ showModal: (params: any) => void } | undefined>;
}

const InfoModal = (props: Props) => {
	const { username } = store.getState().global.userInfo;
	const [data, setData] = useState<Account.UserInfo>();
	const [modalVisible, setModalVisible] = useState(false);
	const [submitHidden, setSubmitHidden] = useState<boolean>(true);

	useImperativeHandle(props.innerRef, () => ({
		showModal
	}));

	const showModal = (params: { name: number }) => {
		console.log(params);
		setModalVisible(true);
	};

	useEffect(() => {
		userInfo();
	}, []);

	// 修改用户信息
	const handleOk = (values: any) => {
		setSubmitHidden(true);
		// setModalVisible(false);
		console.log("Received values of form: ", values);
		message.success("修改用户信息成功 🎉🎉🎉");
	};

	// 取消按钮的响应
	const handleCancel = () => {
		setModalVisible(false);
	};

	// 加载用户详情
	const userInfo = async () => {
		const params: getUserInfoParams = {
			username: username
		};
		const { data } = await getUserInfo(params);
		setData(data!);
		return data;
	};

	// useEffect(() => {
	// 	setSubmitHidden(submitHidden);
	// }, [submitHidden]);

	const updateClick = () => {
		setSubmitHidden(false);
		console.log(submitHidden);
	};

	return (
		<Modal centered keyboard title="个人信息" open={modalVisible} onCancel={handleCancel} destroyOnClose={true} footer={null}>
			<Button></Button>
			<Form
				disabled={submitHidden}
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 10 }}
				layout="horizontal"
				onFinish={handleOk}
				size={"small"}
			>
				<Form.Item
					initialValue={`${data?.username}`}
					name={["userinfo", "username"]}
					label="用户名"
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 8 }}
				>
					<Input />
				</Form.Item>
				<Form.Item
					wrapperCol={{ span: 8 }}
					labelCol={{ span: 4 }}
					name={["userinfo", "nickName"]}
					label="昵称"
					initialValue={`${data?.nickName}`}
				>
					<Input />
				</Form.Item>
				<Form.Item label="性别" name={["userinfo", "gender"]} initialValue={data?.gender}>
					<Radio.Group value={data?.gender}>
						<Radio value={0}> 女 </Radio>
						<Radio value={1}> 男 </Radio>
						<Radio value={-1}> 未知 </Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item label="手机号" name={["userinfo", "phoneNumber"]} initialValue={`${data?.phoneNumber}`}>
					<Input />
				</Form.Item>
				<Form.Item label="邮箱" name={["userinfo", "email"]} initialValue={`${data?.email}`}>
					<Input />
				</Form.Item>
				<Form.Item label="头像" name={["userinfo", "avatar"]} initialValue={`${data?.avatar}`}>
					<Avatar shape="square" size={64} src={data?.avatar} />
					{/* <UploadAvatar></UploadAvatar> */}
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
