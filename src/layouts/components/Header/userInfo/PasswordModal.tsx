import { useState, useImperativeHandle, Ref } from "react";
import { Modal } from "antd";
import PasswordForm from "./components/PasswordForm";

interface Props {
	innerRef: Ref<{ showModal: () => void }>;
}

const PasswordModal = (props: Props) => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	useImperativeHandle(props.innerRef, () => ({
		showModal
	}));

	const showModal = () => {
		setIsModalVisible(true);
	};

	const setModalHidden = () => {
		setIsModalVisible(false);
	};

	return (
		<Modal footer={null} title="修改密码" open={isModalVisible} onCancel={setModalHidden} destroyOnClose={true}>
			<PasswordForm onModalHidden={setModalHidden} />
		</Modal>
	);
};
export default PasswordModal;
