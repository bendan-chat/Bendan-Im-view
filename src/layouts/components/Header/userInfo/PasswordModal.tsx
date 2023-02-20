/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useImperativeHandle, Ref } from "react";
import { Modal, Button } from "antd";
import SendMailCodeForm from "./components/SendMailCodeForm";
import PasswordForm from "./components/PasswordForm";

import "./PasswordModal.less";
import { store } from "@/redux";

interface Props {
	innerRef: Ref<{ showModal: () => void }>;
}

const PasswordModal = (props: Props) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [passwordForm, setPasswordForm] = useState<boolean>(true);
	const [myUserId, setMyUserId] = useState<number>();
	const { email } = store.getState().global.userInfo;

	useImperativeHandle(props.innerRef, () => ({
		showModal
	}));

	const showModal = () => {
		setIsModalVisible(true);
	};

	return (
		<Modal
			width={500}
			footer={null}
			title={<span style={{ fontWeight: "bold", fontSize: "20px" }}>修改密码</span>}
			open={isModalVisible}
			onCancel={() => {
				setIsModalVisible(false);
				setPasswordForm(true);
			}}
			destroyOnClose={true}
		>
			{passwordForm ? (
				<SendMailCodeForm onUserId={setMyUserId} email={email} onNextStep={setPasswordForm} />
			) : (
				<PasswordForm email="" userId={myUserId!} setIsModalVisible={setIsModalVisible} setPasswordForm={setPasswordForm} />
			)}
		</Modal>
	);
};
export default PasswordModal;
