import React, { useState } from "react";
import { PhoneTwoTone } from "@ant-design/icons";
import { Modal } from "antd";

export default function PhoneIcon() {
	const [open, setOpen] = useState<boolean>(false);

	const phoneClick = () => {
		console.log("phoneClick");
		setOpen(true);
	};

	return (
		<>
			<PhoneTwoTone onClick={phoneClick} className="phone-right-icon" />
			<Modal footer={null} open={open} destroyOnClose={true} centered={true} width={300} onCancel={() => setOpen(false)}>
				<div>功能开发中......</div>
			</Modal>
		</>
	);
}
