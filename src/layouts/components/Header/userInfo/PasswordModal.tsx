/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useImperativeHandle, Ref } from "react";
import { Modal, Button } from "antd";
import SendMailCodeForm from "./components/SendMailCodeForm";
import PasswordForm from "./components/PasswordForm";

import "./PasswordModal.less";

interface Props {
	innerRef: Ref<{ showModal: () => void }>;
}

const PasswordModal = (props: Props) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [passwordForm, setPasswordForm] = useState<boolean>(true);

	useImperativeHandle(props.innerRef, () => ({
		showModal
	}));

	const showModal = () => {
		setIsModalVisible(true);
	};

	return (
		<Modal
			width={900}
			footer={null}
			title={<span style={{ fontWeight: "bold", fontSize: "20px" }}>修改密码</span>}
			open={isModalVisible}
			onCancel={() => {
				setIsModalVisible(false);
				setPasswordForm(true);
			}}
			destroyOnClose={true}
		>
			<div className="password-update-Modal">
				{passwordForm ? (
					<SendMailCodeForm setPasswordForm={setPasswordForm} />
				) : (
					<PasswordForm setIsModalVisible={setIsModalVisible} setPasswordForm={setPasswordForm} />
				)}
			</div>
		</Modal>
	);
};
export default PasswordModal;
