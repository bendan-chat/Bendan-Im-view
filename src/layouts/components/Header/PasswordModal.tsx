import { useState, useImperativeHandle, Ref } from "react";
import { Modal } from "antd";
import PasswordForm from "./PasswordForm";

interface Props {
	innerRef: Ref<{ showModal: (params: any) => void }>;
}

const PasswordModal = (props: Props) => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	useImperativeHandle(props.innerRef, () => ({
		showModal
	}));

	const showModal = (params: { name: number }) => {
		console.log(params);
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	return (
		<Modal footer={null} title="修改密码" open={isModalVisible} onCancel={handleCancel} destroyOnClose={true}>
			<PasswordForm />
		</Modal>
	);
};
export default PasswordModal;
